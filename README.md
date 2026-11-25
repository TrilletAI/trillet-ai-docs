# Trillet docs

Source for [docs.trillet.ai](https://docs.trillet.ai), the documentation for Trillet's AI voice and messaging agents. The site is built with [Jamdesk](https://jamdesk.com) from the MDX files in this repo.

## What's here

| Path | Contents |
|---|---|
| `docs.json` | Site configuration: navigation tabs, theme, logo and API settings |
| `documentation/` | Guides: introduction, quickstart, integrations, web widget |
| `v1/api-reference/` | REST API reference (API Reference V1 tab) |
| `voice-engine/` | Voice Engine partner API (Trillet OEM tab) |
| `mcp/`, `mcp.mdx` | The Trillet MCP server and its tools |
| `changelog/` | API and MCP changelog. Product releases are at [trillet.ai/changelog](https://trillet.ai/changelog) |
| `public/openapi/` | OpenAPI spec for the Voice Engine partner API (YAML and JSON, kept in sync) |
| `images/`, `public/` | Images and logos used by the pages |
| `scripts/check-example-ids.mjs` | Check that examples only use fake IDs (see below) |

## Run it locally

```bash
npm install -g jamdesk

jamdesk dev            # preview at http://localhost:3000
jamdesk validate       # config, MDX and OpenAPI checks
jamdesk broken-links   # internal links and anchors
```

## Before opening a pull request

The docs are public, so examples must never contain real data.

- Use obvious fake IDs: one hex pair repeated 12 times, such as `aaaaaaaaaaaaaaaaaaaaaaaa` or `a1a1a1a1a1a1a1a1a1a1a1a1`. Use fake phone numbers, names and URLs too.
- Run `node scripts/check-example-ids.mjs`. It fails on real-looking IDs or internal hostnames in the lines you added. The same check runs on every pull request.
- Describe how the API behaves today. If an endpoint has a bug, don't document the bug as behaviour: report it instead.
- Keep each file's existing line endings (some pages use CRLF).

## Publishing

Pull requests go into `main`. Changes merged into `main` are published to docs.trillet.ai by Jamdesk.
