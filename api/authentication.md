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

Personal API keys are tied to your existing Airframes account and its limits. Proposed [company Workspace keys](./workspaces.md) instead belong to the company and share its quotas; they do not act as human accounts.

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
| Free | 10/min, 100/hour, 500/day | Personal default or a new company Workspace |
| Pro / Feeder Pro | 200/min, 5,000/hour, 50,000/day | Feeder Pro remains a Personal entitlement |
| Business | 500/min, 25,000/hour, 250,000/day | One shared allowance per commercial subject |
| Custom | Contract overrides; Business defaults until configured | Contact Airframes about the agreement |
| Enterprise | No plan-window cap | Usage is still recorded |

The anonymous per-IP protection is separate from authenticated plan quotas. A UTC calendar-month usage total is reported without adding a monthly cap. View current limits in account settings; company Workspace usage is shared across members and keys.

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
