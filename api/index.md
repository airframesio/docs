---
sidebar_position: 1
---

# API Overview

The Airframes REST API provides access to aggregated and processed aviation data from our global network of ACARS receivers. Our API allows authorized users to query real-time and historical aircraft communications, flight data, and station information.

## API Specification

🚀 **[Interactive API Reference](/api-reference)** - Complete interactive API documentation with live testing capabilities.

📋 **[View OpenAPI Specification](./openapi.yaml)** - Raw OpenAPI YAML specification file.

## Authentication & Access

All API requests require an API key. See the [Authentication](./authentication.md) page for details on obtaining and using API keys.

There are two classifications of authorized API users:

### **Feeders**
Users who run a receiver that contributes data in real-time to Airframes with a measure of *validated data* will receive a minimal, yet useful, free API account.

### **Customers**
Paying users/subscribers will be able to access the API in relation to their subscription tier. Initially this will be a nominal fee with no feeder requirement.

See [Pricing](./pricing.md) for current access tiers.

## Available Endpoints

Our API provides access to:

- **Flights** - Active, live and historical flights, with events, messages and position trails
- **Routes** - Flown tracks and great-circle routes (`/airframes/flights/{id}/route`, `/airframes/routes`)
- **Messages** - ACARS messages, OOOI reports, and aircraft communications
- **ACARS / VDL / HFDL** - Protocol-specific message and ground-station data
- **Decode** - On-demand decoding of raw ACARS payloads
- **Airframes** - Aircraft registration and type details (by id, tail, ICAO, IATA)
- **Airlines** - Airline information and ICAO/IATA codes
- **Airports** - Airport data and location (by id, ICAO, IATA, ident, type, bounding box)
- **Stations** - Feeder station data, coverage and statistics
- **Leaderboard** - Station rankings, hall of fame and awards
- **Stats** - Platform, ACARS and frequency-usage statistics
- **Marine** - AIS vessel and voyage tracking
- **Sonde** - Radiosonde (weather balloon) flights and positions

## Versioning

All endpoints are served under the **`/v1`** prefix (for example
`https://api.airframes.io/v1/flights`). For backward compatibility the same
endpoints also respond without the prefix, but **`/v1` is the documented, stable
path** and should be preferred for new integrations.

## Conventions

- **Authentication is optional on public data endpoints** — they work
  anonymously, but sending your API key (`Authorization: Bearer …` or
  `X-API-KEY`) applies your tier's higher rate limits and attributes usage to
  your account.
- **Pagination** — list endpoints accept `limit`/`offset` (or `page`/`limit`, or
  cursor `before_id`) and return `X-Total-Count` / `X-Result-Count` /
  `X-Page` / `X-Per-Page` / `X-Total-Pages` headers.
- **Time ranges** — time-filtered endpoints accept `since` / `until` (ISO-8601).
- **Rate limits** — `X-RateLimit-Limit` / `X-RateLimit-Remaining` /
  `X-RateLimit-Reset` (and `Retry-After` on `429`). Every response includes an
  `X-Request-ID`.
- **Conditional requests** — responses carry an `ETag`; send it back as
  `If-None-Match` to get a `304 Not Modified` and save bandwidth.
- **Errors** use a consistent shape: `{ statusCode, message, error, timestamp }`.

## Tooling

The [OpenAPI specification](./openapi.yaml) can be imported directly into
**Postman**, **Insomnia**, or any OpenAPI 3 client to generate a ready-to-use
request collection, or fed to an OpenAPI code generator to produce a client SDK
in your language.

## Getting Started

1. Browse the [Interactive API Reference](/api-reference) or the [OpenAPI specification](./openapi.yaml) for detailed endpoint documentation
2. Contact us for API access and authentication credentials
3. Start making requests to the REST endpoints under `/v1`
4. For live data, see [Realtime / Streaming](./realtime.md)

## Base URLs

- **Production**: `https://api.airframes.io/v1`
- **Staging**: `https://staging.airframes.io/v1`

For more information about API access, please see our [contact page](./contact.md).
