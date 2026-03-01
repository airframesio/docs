---
sidebar_position: 2
---

# Authentication

:::caution Under Development
The Airframes API is under active development. Authentication details on this page reflect the planned approach and may change before general availability. [Contact us](./contact.md) for early access.
:::

## API Keys

All API requests require an API key passed via the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

API keys are tied to your Airframes account and determine your access tier and rate limits.

## Obtaining an API Key

### Feeders

If you operate an active feeder station that consistently contributes data to Airframes, you are eligible for a free API key. To request one:

1. Ensure your station is visible on [app.airframes.io/stations](https://app.airframes.io/stations) and has been feeding for at least 7 days
2. Contact [api@airframes.io](mailto:api@airframes.io) with your station ID

### Commercial / Paid Access

Paid API keys are available for higher rate limits and broader access. See the [Pricing](./pricing.md) page for details, or contact [api@airframes.io](mailto:api@airframes.io) to discuss your use case.

## Rate Limits

Rate limits depend on your access tier:

| Tier | Rate Limit | Notes |
|------|-----------|-------|
| Feeder (Free) | 60 requests/minute | For personal and non-commercial use |
| Paid | Varies by plan | Contact us for details |

When you exceed your rate limit, the API returns `429 Too Many Requests` with a `Retry-After` header indicating when you can resume.

## Example Request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.airframes.io/v1/messages?flight=UAL123
```

## Security

- Keep your API key private. Do not commit it to public repositories or share it in public channels.
- If you believe your key has been compromised, contact [api@airframes.io](mailto:api@airframes.io) to have it revoked and reissued.
- All API requests must be made over HTTPS.
