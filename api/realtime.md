---
sidebar_position: 4
---

# Realtime / Streaming

In addition to the REST API, Airframes streams live data over a
[Socket.IO](https://socket.io/) (WebSocket) connection. Use it to receive
messages and station activity as they happen instead of polling.

- **URL:** `wss://ws.airframes.io`
- **Transport:** WebSocket only (`transports: ['websocket']`)
- **Protocol:** Socket.IO (use a Socket.IO client, not a raw WebSocket)

## Authenticating

Pass your credentials in the Socket.IO handshake (either `auth` or `query`):

```js
import { io } from 'socket.io-client';

const socket = io('wss://ws.airframes.io', {
  transports: ['websocket'],
  auth: { apiKey: 'YOUR_API_KEY' }, // or { token: 'YOUR_JWT' }
});
```

- **API key** (`apiKey`) → subscribes you to a per-account **feed** of messages
  from your own stations. On success the server emits
  `feed:authenticated` with `{ userId, username, stations: [{ id, ident, sourceType }] }`.
- **JWT** (`token`) → authenticates an app/user session (chat, notifications,
  presence). On success the server emits `chat:authenticated` with `{ userId }`.

Invalid credentials emit `feed:error` / `chat:error` with `{ message }`.

## Streams

### Your station feed (API key)

After authenticating with an API key you automatically receive a `feed:message`
event for each message ingested from one of your stations:

```js
socket.on('feed:message', (message) => {
  // message is a full Message object (same shape as GET /v1/messages/:id)
});
```

### Global message firehose

Subscribe to a sampled stream of all messages across the network:

```js
socket.on('connect', () => {
  socket.emit('messages:sniff'); // restore this subscription after every reconnect
});
socket.on('messages:sniff:started', ({ browserId }) => {});
socket.on('message', (message) => {
  // a Message object, enriched with station/airframe/flight
});
```

> The global `message` stream is **sampled** (a fraction of total traffic) and
> intended for live displays, not complete capture. For your own stations, use
> the API-key `feed:message` stream above (unsampled).

### Per-station monitor

Subscribe to live activity for a specific station:

```js
let monitoredStationId = 123;
socket.on('connect', () => {
  if (monitoredStationId !== null) socket.emit('station:monitor:start', monitoredStationId);
});
socket.on('station:monitor:started', ({ station }) => {});
socket.on('station:monitor:data', ({ station, stationId, newMessages }) => {
  // newMessages: Message[]
});
// Call when the visitor stops monitoring:
function stopMonitoring() {
  if (monitoredStationId !== null) socket.emit('station:monitor:stop', monitoredStationId);
  monitoredStationId = null;
}
```

## Event reference

### Server → client

| Event | Payload | Notes |
|-------|---------|-------|
| `server:reconnect` | `{ version: 1, deploymentId, reason: 'deployment', retryAfterMs, jitterMs }` | optional planned handoff; see below |
| `auth:error` | `{ message }` | access revoked/unavailable; stop and resolve authentication |
| `feed:authenticated` | `{ userId, username, stations[] }` | after API-key auth |
| `feed:message` | `Message` | your stations' messages (unsampled) |
| `message` | `Message` | global firehose (sampled); also delivered to the `messages:sniff` room |
| `messages:sniff:started` | `{ browserId }` | ack for `messages:sniff` |
| `station:monitor:started` | `{ browserId, station: { id, ident } }` | ack for `station:monitor:start` |
| `station:monitor:data` | `{ station, stationId, newMessages: Message[] }` | per-station live messages |
| `station:monitor:stopped` | `{ browserId, stationId }` | ack for `station:monitor:stop` |
| `chat:authenticated` | `{ userId }` | after JWT auth |
| `presence:snapshot` / `presence:update` | `{ online: string[] }` / `{ userId, online }` | app presence |
| `chat:message:new`, `notification:new`, … | varies | app chat/notifications |
| `feed:error` / `chat:error` / `error` | `{ message }` | errors, incl. rate-limit |

### Client → server

| Event | Payload | Effect |
|-------|---------|--------|
| `messages:sniff` | — | join the global firehose |
| `station:monitor:start` | `stationId` (number) | subscribe to a station |
| `station:monitor:stop` | `stationId` (number) | unsubscribe |
| `chat:message:send` | `{ recipientId, body }` | send a DM (JWT) |
| `chat:thread:read` | `{ userId }` | mark a thread read |
| `chat:typing` | `{ recipientId, isTyping }` | typing indicator |

## Rate limits

WebSocket events are rate-limited per connection: **10 subscribe-type events /
minute** (`messages:sniff`, `station:monitor:*`) and **30 chat sends / minute**.
Exceeding a limit emits an `error` (or `chat:error`) with
`{ message: 'Rate limit exceeded' }`.

## Reconnecting and planned maintenance

Keep Socket.IO automatic reconnection enabled. A network interruption or transport
closure can then recover with its usual backoff. The endpoint stays
`wss://ws.airframes.io`; a deployment notice never supplies a new URL or credentials.

When planned handoffs are enabled on a worker, it sends **`server:reconnect`** before
closing its remaining transports. Supporting this optional event spreads reconnects
across a short window. A worker without this capability sends no notice; normal
transport reconnection still applies. Clients that disable automatic reconnection
must implement their own recovery. A server cannot force them to reconnect.

Example notice (milliseconds):

```json
{
  "version": 1,
  "deploymentId": "e249a5a6-2b62-4a12-99dc-b084c8086daa",
  "reason": "deployment",
  "retryAfterMs": 500,
  "jitterMs": 5000
}
```

Wait `retryAfterMs + random(0..jitterMs)` before disconnecting and explicitly
connecting again. Treat the deployment ID as an opaque deduplication token, not a
release version. Validate the event version, reason, finite nonnegative integer
delays and their bounds before acting. The reference client caps each delay at
10 seconds, the total at 20 seconds, and accepts at most one notice per 30 seconds.
It cancels pending work on disconnect, logout, authentication failure and disposal.
Ordinary transport retries remain owned by Socket.IO.

### Reference JavaScript client

[Download the reconnect controller](/examples/planned-reconnect.mjs) and copy it
into your client project alongside this code. It uses `socket.io-client` v4.
Keep credentials in your existing secure configuration; never commit or log keys.

```js
import { io } from 'socket.io-client';
import { createPlannedReconnect } from './planned-reconnect.mjs';

const socket = io('wss://ws.airframes.io', {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  // Read the CURRENT credential on every handshake, including automatic retries.
  auth: (callback) => callback({ apiKey: readCurrentApiKey() }),
});
const reconnect = createPlannedReconnect(socket);

// Register listeners once, outside `connect`, to avoid duplicate deliveries.
socket.on('feed:message', handleStationMessage);
socket.on('connect', () => {
  showConnectionStatus('Connected');
  // Restore only subscriptions the visitor still wants (10 subscribe events/min).
  // Own-station API-key feed rooms are restored by the authenticated handshake.
});
socket.on('feed:authenticated', () => {
  void refreshRelevantSnapshots().catch(showRefreshError);
});
socket.on('feed:error', (error) => {
  reconnect.stop();
  showAuthenticationError(error.message); // obtain corrected credentials first
});
socket.on('auth:error', (error) => showAuthenticationError(error.message));
socket.on('disconnect', () => showConnectionStatus('Disconnected'));
socket.on('connect_error', (error) => {
  showConnectionStatus(socket.active ? 'Reconnecting…' : 'Sign in or check credentials');
});

reconnect.start();
// On logout/route teardown: reconnect.stop();
// After an explicit credential replacement:
// reconnect.credentialsChanged(true); reconnect.start();
// On final teardown: reconnect.dispose();
```

The application functions in this example (`readCurrentApiKey`, message handlers,
snapshot refresh and status/error rendering) are yours to supply. For JWT chat
clients, read the current `token` in the auth callback and wait for
`chat:authenticated` before doing authenticated work. The gateway restores chat
membership after validating the JWT. Refresh conversation lists, unread counts,
presence and the open conversation to reconcile missed activity.

### Authentication failures are different

Socket.IO does **not** automatically reconnect after `io server disconnect`,
`io client disconnect`, or a middleware authentication denial (`socket.active`
is false). Do not turn those into unconditional retry loops: account access may
have been revoked. The reference controller blocks subsequent route/visibility
starts after access denial until an explicit credential change. Display a useful
status and resolve credentials/access first. Handle `auth:error`, `feed:error`
and `chat:error` without logging secrets. A normal chat rate-limit error is not a
reason to retry authentication.

### Delivery and missed messages

A reconnect restores a connection, not a replay. Socket.IO delivers events at
most once by default; live events emitted while disconnected can be missed.
Airframes currently uses the Redis PUB/SUB adapter, which does not support
Socket.IO connection-state recovery. Do not assume a session ID resumes rooms,
authentication or missed packets. Re-authenticate, restore explicit subscriptions
on each `connect`, and fetch relevant persisted data through REST after successful
authentication. Deduplicate snapshots and live messages using stable message IDs.
Do not automatically resend a chat message or other mutation unless you can prove
it was not accepted or have an idempotency mechanism.

The global stream remains sampled, including after reconnect. For workflows that
require complete capture, use an appropriate persisted-data integration; a browser
live stream is not a durable queue.

References: [Socket.IO disconnect behavior](https://socket.io/docs/v4/client-socket-instance/#disconnect),
[delivery guarantees](https://socket.io/docs/v4/delivery-guarantees/), and
[connection-state recovery compatibility](https://socket.io/docs/v4/connection-state-recovery/).
