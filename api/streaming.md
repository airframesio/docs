---
sidebar_position: 5
---

# Streaming Subscriptions

:::caution Rolling out
Streaming subscriptions are being rolled out. Limits may change before general availability.
:::

Subscribe to live messages from across the Airframes network, filtered to what you care about. The same subscriptions and limits are available over **WebSocket** (Socket.IO) and **MQTT**. Station, aircraft, label and message-type filters work on both; airline, flight and region filters are WebSocket only.

## Your own stations are always included

On every plan, including Free, you can subscribe to your own stations' messages, and it never counts against your plan. A subscription is an own-station subscription when it has a `stations` filter and every value in it is a station you own (ident or numeric id). Other fields, such as `tails` or `labels`, only narrow it further, so `{ "stations": ["YOUR-STATION"], "tails": ["N123AB"] }` is still an own-station subscription. It does not use your plan's connections, subscriptions per connection, messages per second or usage figures, and it works over WebSocket and MQTT even if your plan includes neither. Abuse limits still apply: up to 10 connections and 50 own-station subscriptions per connection.

A subscription whose `stations` list also names someone else's station, or that has no `stations` filter at all, is checked against your plan as usual. If a station stops being yours, its subscriptions end with `stream:unsubscribed` and reason `not_your_station`.

The original own-station WebSocket feed also still works on every plan; see [Realtime / Streaming](./realtime.md).

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
| [Map viewport](#map-viewports) positions per second (burst) | — | 40 (200) | 100 (500) | 300 (1,500) |

Limits apply per account. Connections are counted across WebSocket and MQTT together. None of these limits apply to [your own stations](#your-own-stations-are-always-included).

## Filters

A filter is a JSON object. **Every field you include must match**, and within a field **any listed value may match**.

```json
{ "tails": ["N123AB", "N456CD"], "labels": ["H1", "80"] }
```

That filter matches label `H1` or `80` messages from either of the two aircraft.

| Field | Matches | Plans |
|---|---|---|
| `stations` | Station ident or numeric id | Pro and up, or any plan for your own stations |
| `tails` | Aircraft registration | Pro and up |
| `flights` | Flight number | Pro and up |
| `icaos` | ICAO 24-bit hex address | Pro and up |
| `airlines` | Airline ICAO code | Business and up |
| `labels` | ACARS label | Business and up |
| `region` | `[minLon, minLat, maxLon, maxLat]`, up to 10° per side on Business. Matches only messages that carry a position. | Business and up |
| `sourceTypes` | Message type, for example `ACARS` | Enterprise |
| *(empty filter)* | Everything | Enterprise |

A filter is judged by its most specific field. `{ "tails": ["N123AB"], "labels": ["H1"] }` is available on Pro, because it is narrowed to one aircraft. Values are case-insensitive.

### Ships and balloons

Subscriptions can also carry live ship positions (AIS) and weather balloon positions (radiosondes). These are WebSocket only.

| Field | Matches | Plans |
|---|---|---|
| `voyages` | Marine voyage id, a uuid such as `5b0c6a43-8a4e-4d3e-9b51-0f3c0c3b8f11` (the `id` of `/v1/marine/voyages/:id`): one ship's current voyage | Pro and up |
| `vessels` | Marine vessel id (uuid) | Pro and up |
| `sondeFlights` | Sonde flight id, a uuid (the `id` of `/v1/sonde/flights/:id`): one balloon flight | Pro and up |
| `serials` | Radiosonde serial, for example `V1234567` | Pro and up |
| `kinds` | Any of `aircraft`, `marine`, `sonde` | Same as the other fields in the filter |

When `kinds` is left out, the fields decide: a filter that names `voyages` or `vessels` carries ships, one that names `sondeFlights` or `serials` carries balloons, and any other filter carries aircraft messages only, as it always has. So existing subscriptions (including the empty filter and `region` filters) never start receiving ships or balloons. Fields of two kinds in one filter are refused; subscribe to each kind separately. To get ships in an area, add `kinds`: `{ "kinds": ["marine"], "region": [3, 51, 5, 53] }` (Business and up, like any region filter).

Ships and balloons arrive as `stream:message` too, with a `type` so they can be told apart from aircraft messages:

```json
{ "type": "marine-position", "voyageId": "5b0c6a43-…", "vesselId": "ab2d6a43-…",
  "timestamp": "2026-11-27T12:00:01.000Z", "latitude": 51.95, "longitude": 4.05,
  "speedOverGround": 12.3, "courseOverGround": 87.1, "trueHeading": 88,
  "rateOfTurn": 0, "navigationStatus": 0, "countryCode": "NL" }
```

```json
{ "type": "sonde-position", "sondeFlightId": "c3f0a1b2-…", "serial": "V1234567",
  "sondeType": "RS41", "timestamp": "2026-11-27T12:00:01.500Z", "latitude": 52.1,
  "longitude": 4.9, "altitude": 18200, "velocityHorizontal": 12, "velocityVertical": 5.1,
  "heading": 90, "temperature": -55, "humidity": 3, "pressure": 70,
  "attribution": "Balloon data: SondeHub (CC BY-SA 2.0)" }
```

Speed is in knots, ship course and heading in degrees (null when the ship does not report them), `navigationStatus` the AIS navigation status (0 under way using engine, 1 at anchor, 5 moored, 7 fishing, 8 under way sailing; null when not reported), balloon altitude in meters and velocities in m/s. Every AIS position report is streamed; a balloon's newest position arrives every few seconds. Balloon data comes from [SondeHub](https://sondehub.org) under CC BY-SA 2.0: anything that shows it must credit SondeHub.

## Map viewports

A map can stream the positions of everything it shows: subscribe with `viewport: true` and the visible box, and resubscribe with the same id whenever the map moves.

```js
socket.emit('stream:subscribe', {
  id: 'viewport',
  filter: { viewport: true, region: [-125, 30, -110, 45] },
});
```

- Any box size is allowed on every paid plan, including the whole world. A box that crosses the antimeridian has `minLon` greater than `maxLon` (`[170, -50, -170, -30]`).
- Without `kinds` a viewport carries aircraft, ships and balloons; add `kinds` to pick some. No other filter field may go with it.
- Each item is sent at most once every 5 seconds (3 on Business, 2 on Enterprise), under its own rate cap on top of your plan's message rate. Positions over the cap are skipped quietly, without a `stream:throttled` notice, so a map simply moves each item on its next position.
- One viewport per connection. Moving it (resubscribing with its id) does not count toward subscription changes; it has its own allowance of 60 moves a minute on Pro (120 on Business, 240 on Enterprise), beyond which the move is refused with `viewport_rate_limited` and the previous box stays.

Aircraft come as small position items instead of whole messages. Ships and balloons come as shown above.

```json
{ "type": "aircraft-position", "flightId": "1234567", "icao": "AC101F", "tail": "N8768Q",
  "flight": "WN2457", "timestamp": "2026-11-28T06:50:12.000Z",
  "latitude": 43.6, "longitude": -116.3, "altitude": 3150 }
```

Only aircraft messages that carry a position are sent, so an aircraft's position is as fresh as its last message with one. Altitude is in feet as the message reported it.

## WebSocket

Connect with your API key as described in [Realtime / Streaming](./realtime.md#authenticating), then subscribe. Airframes' own apps, such as Airframes Desktop, may connect with the signed-in session token (`auth: { token }`) instead; the account's plan applies the same way.

Example with an API key:

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
  // (or a ship or balloon position, see "Ships and balloons")
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
| Server → client | `stream:unsubscribed` | `{ id, removed }`, or `{ id, reason }` with reason `plan_changed` or `not_your_station` |
| Server → client | `stream:message` | `{ subscriptions: string[], message }` |
| Server → client | `stream:status` | `{ plan, limits, delivered, dropped, subscriptions }` |
| Server → client | `stream:throttled` | `{ dropped, droppedTotal, ratePerSecond, plan }` |
| Server → client | `stream:error` | `{ code, message, id?, limit?, upgradeTo? }` |

## MQTT

Available on Business and Enterprise. On any plan you can also use MQTT for [your own stations](#your-own-stations-are-always-included), with `airframes/v1/messages/+/YOUR-STATION/#` or `airframes/stations/YOUR-STATION/messages` (or `airframes/stations/+/messages` for all of them).

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
| `airframes/v1/messages/+/KE-KSFO1/#` | One station | Business and up, or any plan if it is your station |
| `airframes/v1/messages/+/+/+/H1` | One label | Business and up |
| `airframes/v1/messages/ACARS/#` | One message type | Enterprise |
| `airframes/v1/messages/#` | Everything | Enterprise |
| `airframes/stations/YOUR-STATION/messages` | One of your own stations (same messages as the v1 topic) | Any plan, own stations only |
| `airframes/stations/+/messages` | All of your own stations | Any plan, own stations only |

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
- A plan change applies within a few minutes without a reconnect. On a downgrade, subscriptions your new plan does not allow are removed and you are told which. Subscriptions to your own stations are kept.

For complete capture, use the REST API or a bulk export.

## Error codes

| Code | Meaning |
|---|---|
| `auth_required` | Connect with an API key (or a signed-in session) first. |
| `plan_required` | Your plan does not include this stream. |
| `connection_limit` | You have reached your plan's concurrent connections. |
| `subscription_limit` | You have reached your plan's subscriptions per connection. |
| `filter_too_broad` | Narrow the filter, or upgrade to the plan in `upgradeTo`. |
| `too_many_values` | Too many values in one filter field. |
| `region_too_large` | The region box is larger than your plan allows. |
| `invalid_filter`, `invalid_id`, `invalid_topic` | The request is malformed. |
| `rate_limited` | Too many subscription changes in a minute. |
| `viewport_rate_limited` | The map viewport moved too often in a minute; the previous box stays. |
| `viewport_limit` | A connection has one viewport; resubscribe with its id to move it. |
| `slow_consumer` | Disconnected because the client was not keeping up. |

## Your usage

`GET /v1/user/data-feeds/streaming` returns your plan's limits and hourly usage (messages, bytes and dropped messages). The same figures are shown under **Settings → Integrations**.
