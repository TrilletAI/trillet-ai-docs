#!/usr/bin/env node
// Fails when a change adds a real-looking ID or an internal hostname to the public docs.
//
// docs.trillet.ai and this repo are public. Examples must use obvious fakes, so a copied
// response from dev or prod can't leak a real workspace, record or recording URL.
//
//   node scripts/check-example-ids.mjs                 # lines added vs origin/main
//   node scripts/check-example-ids.mjs origin/my-base  # lines added vs another base
//   node scripts/check-example-ids.mjs --all           # report every file (informational)
//
// A 24-character hex ID passes only if it is an obvious fake: one hex pair repeated
// 12 times (aaaaaaaaaaaaaaaaaaaaaaaa, a1a1a1a1a1a1a1a1a1a1a1a1). Anything else must be
// replaced, or listed in .example-id-allowlist (one value per line, # for comments)
// when it genuinely is not an ID.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const EXTENSIONS = ['mdx', 'md', 'json', 'yaml', 'yml'];
const HEX_ID = /(?<![0-9a-fA-F])[0-9a-f]{24}(?![0-9a-fA-F])/g;
// Hosts that must never appear in public docs.
const INTERNAL_HOSTS = /\b[\w.-]*(verlatai\.com|northflank\.app|code\.run|mongodb\.net|infisical\.com)\b/gi;

const allowlist = new Set(
  existsSync('.example-id-allowlist')
    ? readFileSync('.example-id-allowlist', 'utf8')
        .split('\n')
        .map((l) => l.replace(/#.*/, '').trim())
        .filter(Boolean)
    : [],
);

const isObviousFake = (id) => id === id.slice(0, 2).repeat(12);

function findProblems(text) {
  const problems = [];
  for (const id of text.match(HEX_ID) ?? []) {
    if (!isObviousFake(id) && !allowlist.has(id)) {
      problems.push(`real-looking ID ${id} (use an obvious fake like aaaaaaaaaaaaaaaaaaaaaaaa)`);
    }
  }
  for (const host of text.match(INTERNAL_HOSTS) ?? []) {
    if (!allowlist.has(host)) problems.push(`internal hostname ${host}`);
  }
  return problems;
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const pathspecs = EXTENSIONS.map((ext) => `*.${ext}`);
const findings = [];

if (process.argv.includes('--all')) {
  for (const file of git('ls-files', '--', ...pathspecs).split('\n').filter(Boolean)) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => findProblems(line).forEach((p) => findings.push({ file, line: i + 1, p })));
  }
} else {
  const base = process.argv[2] || 'origin/main';
  const diff = git('diff', '--unified=0', '--no-color', '--no-ext-diff', `${base}...HEAD`, '--', ...pathspecs);
  let file = null;
  let lineNo = 0;
  for (const raw of diff.split('\n')) {
    if (raw.startsWith('+++ ')) {
      file = raw === '+++ /dev/null' ? null : raw.slice(6);
    } else if (raw.startsWith('@@')) {
      lineNo = Number(/\+(\d+)/.exec(raw)[1]);
    } else if (raw.startsWith('+') && file) {
      findProblems(raw.slice(1)).forEach((p) => findings.push({ file, line: lineNo, p }));
      lineNo += 1;
    }
  }
}

for (const { file, line, p } of findings) {
  // GitHub turns this into an inline annotation on the PR.
  if (process.env.GITHUB_ACTIONS) console.log(`::error file=${file},line=${line}::${p}`);
  console.log(`${file}:${line}: ${p}`);
}
console.log(findings.length ? `\n${findings.length} problem(s) found.` : 'No real-looking IDs or internal hosts added.');
process.exit(findings.length && !process.argv.includes('--all') ? 1 : 0);
