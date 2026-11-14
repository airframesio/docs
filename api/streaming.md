---
sidebar_position: 5
---

# Streaming Subscriptions

:::caution Rolling out
Streaming subscriptions are being rolled out. Limits may change before general availability.
:::

Subscribe to live messages from across the Airframes network, filtered to what you care about. The same subscriptions and limits are available over **WebSocket** (Socket.IO) and **MQTT**. Station, aircraft, label and message-type filters work on both; airline, flight and region filters are WebSocket only.

For messages from your own stations only, see [Realtime / Streaming](./realtime.md).

## What your plan includes

| | Free | Feeder Pro / Pro | Business | Enterprise |
|---|---|---|---|---|
| WebSocket subscriptions | — | ✓ | ✓ | ✓ |
| MQTT | — | — | ✓ | ✓ |
| Connections at once | — | 2 | 5 | Custom |
| Subscriptions per connection | — | 10 | 50 | Custom |
| Values per filter field | — | 25 | 250 | Custom |
| Filter by aircraft, flight, station | — | ✓ | ✓ | ✓ |
| Filter by airline, label, region | — | — | ✓ | ✓ |
| Full network firehose | — | — | — | ✓ |
| Messages per second (burst) | — | 20 (100) | 100 (500) | Custom |

Limits apply per account. Connections are counted across WebSocket and MQTT together.

## Filters

A filter is a JSON object. **Every field you include must match**, and within a field **any listed value may match**.

```json
{ "tails": ["N123AB", "N456CD"], "labels": ["H1", "80"] }
```

That filter matches label `H1` or `80` messages from either of the two aircraft.

| Field | Matches | Plans |
|---|---|---|
| `stations` | Station ident or numeric id | Pro and up |
| `tails` | Aircraft registration | Pro and up |
| `flights` | Flight number | Pro and up |
| `icaos` | ICAO 24-bit hex address | Pro and up |
| `airlines` | Airline ICAO code | Business and up |
| `labels` | ACARS label | Business and up |
| `region` | `[minLon, minLat, maxLon, maxLat]`, up to 10° per side on Business. Matches only messages that carry a position. | Business and up |
| `sourceTypes` | Message type, for example `ACARS` | Enterprise |
| *(empty filter)* | Everything | Enterprise |

A filter is judged by its most specific field. `{ "tails": ["N123AB"], "labels": ["H1"] }` is available on Pro, because it is narrowed to one aircraft. Values are case-insensitive.

## WebSocket

Connect with your API key as described in [Realtime / Streaming](./realtime.md#authenticating), then subscribe:

```js
import { io } from 'socket.io-client';

const socket = io('wss://ws.airframes.io', {
  transports: ['websocket'],
  auth: { apiKey: 'YOUR_API_KEY' },
});

socket.on('connect', () => {
  // Subscriptions do not survive a reconnect. Send them again on every connect.
  socket.emit('stream:subscribe', {
    id: 'my-fleet',
    filter: { tails: ['N123AB', 'N456CD'] },
  });
});

socket.on('stream:subscribed', ({ id, class: breadth }) => {});
socket.on('stream:message', ({ subscriptions, message }) => {
  // subscriptions: ids of your subscriptions that matched
  // message: a Message object, same shape as GET /v1/messages/:id
});
socket.on('stream:error', ({ code, message, upgradeTo }) => {});
socket.on('stream:throttled', ({ dropped, ratePerSecond }) => {});
```

A message that matches several of your subscriptions is delivered once, with every matching id listed.

### Events

| Direction | Event | Payload |
|---|---|---|
| Client → server | `stream:subscribe` | `{ id?, filter }`. Re-using an `id` replaces that subscription. |
| Client → server | `stream:unsubscribe` | `{ id }` |
| Client → server | `stream:status` | none |
| Server → client | `stream:subscribed` | `{ id, filter, class, subscriptions, maxSubscriptions }` |
| Server → client | `stream:unsubscribed` | `{ id, removed }`, or `{ id, reason: 'plan_changed' }` |
| Server → client | `stream:message` | `{ subscriptions: string[], message }` |
| Server → client | `stream:status` | `{ plan, limits, delivered, dropped, subscriptions }` |
| Server → client | `stream:throttled` | `{ dropped, droppedTotal, ratePerSecond, plan }` |
| Server → client | `stream:error` | `{ code, message, id?, limit?, upgradeTo? }` |

## MQTT

Available on Business and Enterprise.

- **Host and port:** published here when MQTT subscriptions launch. The examples below use `MQTT_HOST` as a placeholder.
- **Encryption:** connect over TLS. Your API key is the password, so never send it over a plain connection.
- **Password:** your API key. Any username is accepted.
- **Protocol:** MQTT 3.1.1, QoS 0, clean sessions only. Publishing is not allowed.

Messages are published on:

```
airframes/v1/messages/{sourceType}/{station}/{tail}/{label}
```

The `airframes/v1/messages` prefix is lower-case and topic matching is case-sensitive. The four variable levels (`{sourceType}`, `{station}`, `{tail}`, `{label}`) are upper-case, and a missing value is `-`. Filter with the usual MQTT wildcards:

| Topic filter | Receives | Plans |
|---|---|---|
| `airframes/v1/messages/+/+/N123AB/#` | One aircraft | Business and up |
| `airframes/v1/messages/+/KE-KSFO1/#` | One station | Business and up |
| `airframes/v1/messages/+/+/+/H1` | One label | Business and up |
| `airframes/v1/messages/ACARS/#` | One message type | Enterprise |
| `airframes/v1/messages/#` | Everything | Enterprise |

```bash
# 8883 is the standard MQTT-over-TLS port; --capath enables certificate checks.
mosquitto_sub -h MQTT_HOST -p 8883 --capath /etc/ssl/certs \
  -u feed -P "YOUR_API_KEY" \
  -t "airframes/v1/messages/+/+/N123AB/#"
```

A subscription your plan does not allow is refused (SUBACK failure). The reason is sent to your connection on the topic `airframes/v1/notices`, which also carries `stream:throttled` notices. The gateway publishes these straight to your connection rather than through a subscription, and a subscription to that topic is refused. Clients such as mqtt.js hand them to the normal message callback. If your client library discards messages that match none of its subscriptions, you will not see notices, so rely on the SUBACK result to detect a refusal.

Airline, flight and region filters are available over WebSocket only, because they are not part of the topic.

## Delivery guarantees

Streaming is **live and at most once**.

- Nothing is stored for you while you are disconnected, and there is no replay.
- If messages arrive faster than your plan's rate, the extra messages are dropped, and a `stream:throttled` notice with the count is sent at most once every ten seconds. Over MQTT this notice arrives on `airframes/v1/notices` as described above, so a client that discards unmatched messages will not see it.
- If your client stops reading for about 30 seconds, it is disconnected with `slow_consumer`.
- A plan change applies within a few minutes without a reconnect. On a downgrade, subscriptions your new plan does not allow are removed and you are told which.

For complete capture, use the REST API or a bulk export.

## Error codes

| Code | Meaning |
|---|---|
| `auth_required` | Connect with an API key first. |
| `plan_required` | Your plan does not include this stream. |
| `connection_limit` | You have reached your plan's concurrent connections. |
| `subscription_limit` | You have reached your plan's subscriptions per connection. |
| `filter_too_broad` | Narrow the filter, or upgrade to the plan in `upgradeTo`. |
| `too_many_values` | Too many values in one filter field. |
| `region_too_large` | The region box is larger than your plan allows. |
| `invalid_filter`, `invalid_id`, `invalid_topic` | The request is malformed. |
| `rate_limited` | Too many subscription changes in a minute. |
| `slow_consumer` | Disconnected because the client was not keeping up. |

## Your usage

`GET /v1/user/data-feeds/streaming` returns your plan's limits and hourly usage (messages, bytes and dropped messages). The same figures are shown under **Settings → Integrations**.
