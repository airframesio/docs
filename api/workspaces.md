---
sidebar_position: 3
---

# Workspaces

:::caution Proposed feature — not activated
This page documents the ENGIN-612 implementation under review. Company Workspaces require a separately approved release and feature activation. Existing Personal accounts continue to work as today.
:::

Workspaces keep a company's subscription, API credentials, shared usage and member access together. Inviting another member does not add a seat charge or another quota allowance. Your feeder stations, personal settings, integrations and station-specific live feeds stay attached to your individual Airframes account.

## Personal and company ownership

Existing users receive one Personal Workspace with full Owner access. It points to the same plan, Stripe subscription/customer, keys, custom limits and usage history you already have. No replacement subscription, copied key or reset usage counter is created. Existing API credentials and account settings continue to work. New accounts receive their Personal Workspace automatically.

A company Workspace starts separately, on the Free plan. Creating one does not move or cancel a Personal subscription. Subscribing in its Billing section buys that company's plan; Stripe asks you to confirm the price. Members and company keys share its minute, hour and daily allowances. Company keys and usage remain with the company if their creator leaves or deletes their Personal account.

## Member roles

| Capability | Owner | Admin | Billing | Member |
| --- | --- | --- | --- | --- |
| View Workspace, members and shared usage | Yes | Yes | Yes | Yes |
| Read aviation data using company quotas | Yes | Yes | No | Yes |
| Create, rotate or revoke company keys | Yes | Yes | No | No |
| Invite/manage Admins and Members | Yes | Yes | No | No |
| Grant or change Owner/Billing access | Yes | No | No | No |
| View invoices and manage billing | Yes | No | Yes | No |

These roles do not grant Airframes Tower staff access. Server checks use current membership, not saved token role claims. An active Owner must remain: promote another active member before the final Owner leaves or deletes their account. Company closure and first-release plan changes require [support](mailto:kevin@airframes.io).

## Invitations

An Owner or Admin creates a private invitation link in Workspaces and shares it with the intended person. Airframes does not automatically email the link in this release. The invitation expires after seven days, is single use, and requires the matching verified email. Revoking or replacing a pending invitation invalidates the old link. An inviter who has lost authority cannot grant access through an old invitation.

The token belongs in the link fragment and is removed before application telemetry starts. It is not stored in browser storage or included in a login redirect. If you register or use external sign-in, reopen the original link afterward. Invite someone as a member first, then promote them to Owner when appropriate. An invitation cannot silently replace an existing member's privileges.

## Company API keys

Owners/Admins can create a company key and copy its full value once. Store it privately. Its `af_ws_` prefix identifies a Workspace service credential, not a human account. The server stores a digest. Rotating a key immediately invalidates its old value; revoking it stops future authentication. Removing its creator does not revoke a company credential.

Use either authentication header, over HTTPS:

```http
Authorization: Bearer YOUR_COMPANY_KEY
```

```http
X-API-KEY: YOUR_COMPANY_KEY
```

The key selects its own Workspace. Do not send a different Workspace selection header. Company keys authorize configured **GET/HEAD aviation data reads**, not account settings, key creation, invitations, billing, Tower, or station ownership changes. Available scopes are `read`, `flights:read` and `stations:read`.

Company service keys do not authorize station-specific WebSocket feed rooms in this release, because those stations remain Personal. Keep using your Personal credential and its station ownership for that feed. Public live WebSocket behavior is unchanged.

## Selecting company quotas with a user session

The website can explicitly select company quotas for new HTTP aviation data requests. Personal remains the default; signing out or starting a new session clears company selection. Company selection does not change Personal billing/settings or station feeds. Billing-only members cannot select company data access.

Clients using a valid user JWT may send:

```http
X-Airframes-Workspace-Id: WORKSPACE_UUID
```

Use this only on commercial GET/HEAD aviation data routes. Do not attach it to `/user`, `/auth`, `/billing`, `/workspaces` or mutation requests. The API rechecks current membership and permission. A Personal API key cannot select a company Workspace. Company credentials select their bound company automatically. An explicit mismatched, revoked or unavailable company context fails; it does not silently become Personal or anonymous access.

The management API uses a human JWT, never a company service key. `GET /workspaces` lists your Workspaces; `/workspaces/:id` and its members, invitations, keys, usage and billing routes act on that explicit ID. Management responses are private and `no-store`. The `/v1/` data alias does not alias Workspace management routes.

## Shared usage and errors

The company gets one shared set of plan windows across all sessions and keys. Creating keys or adding members never multiplies the limits. The current plan limits and UTC calendar-month request total are shown in Usage. The month total is a report, not a new monthly cap. Incomplete tracking or reconciliation is labeled rather than reported as a complete month. Key attribution is not added to the aggregate a second time.

| Response | Meaning and recovery |
| --- | --- |
| `400` | Invalid selection header, unsupported route or request fields. Correct the request. |
| `401` | Invalid/expired/revoked company credential or user session. Sign in or obtain a valid key. |
| `403` | Missing current membership, wrong company key, insufficient role or unsupported private route. Contact a Workspace Owner. |
| `409` | Ownership/billing changed, an active Owner is required, or a billing outcome needs verification. Refresh or contact support. |
| `429` | Shared minute/hour/day allowance exceeded. Respect `Retry-After`; do not rotate keys to bypass it. |
| `503` | Quota, ownership or billing cannot be safely verified. Retry later; contact support for continuity/reconciliation errors. |

The company counter store is durable and separate from the existing Personal cache. If its continuity is lost, company requests fail closed until an operator reconciles them; quotas are not silently reset. Personal requests keep their current path.

## Billing and account deletion

Only Owners and Billing members see financial details. The first release uses a dedicated Stripe Portal for invoices, payment methods and standard subscription cancellation; plan changes require support. Custom agreements show their subscription/payment status, including `past_due`, and offer invoices/payment details plus a contact link. Their Portal cannot change or cancel the contract, and a late-payment status does not remove contractual access.

If a checkout/provider request loses its acknowledgement, do not start a second payment. Airframes retains an operation receipt and requires verification before another billing write. This prevents an unknown outcome from becoming a duplicate subscription.

Deleting a Personal account removes its stations and cancels its eligible Personal subscriptions after the existing warning and billing resolution. Contributed messages remain. It does not cancel a company's subscription or delete company keys and usage. A final company Owner must transfer ownership first.
