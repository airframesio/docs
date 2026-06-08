# Documentation Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

[![Contributors](https://img.shields.io/github/contributors/airframesio/docs)](https://github.com/airframesio/docs/graphs/contributors)
[![Activity](https://img.shields.io/github/commit-activity/m/airframesio/docs)](https://github.com/airframesio/docs/pulse)
[![Discord](https://img.shields.io/discord/1067697487927853077?logo=discord)](https://discord.gg/8Ksch7zE)

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## API Reference (OpenAPI spec)

The `/api` section and the interactive `/api-reference` page are driven by the
OpenAPI spec, which is **generated from the `airframesio/api-server` code** — do
not hand-edit it. The spec lives in **two** places and both must be updated
together:

- `api/openapi.yaml` — the download link + reference under `/api`.
- `static/api/openapi.yaml` — served at `/api/openapi.yaml`, which the
  `swagger-ui-react` page (`src/pages/api-reference.js`) loads. If this copy is
  missing, the interactive reference 404s.

To refresh after API changes, in the api-server repo run `npm run openapi:generate`,
then copy `openapi.yaml` into both locations above and commit. See the
api-server README ("API Documentation") for the full workflow.

## Deployment

Pushing to `main` triggers the GitHub Pages pipeline, which deploys to
https://docs.airframes.io. No api-server deploy is required for the docs to update.
