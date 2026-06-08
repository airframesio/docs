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
socket.emit('messages:sniff');
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
socket.emit('station:monitor:start', 123);          // stationId
socket.on('station:monitor:started', ({ station }) => {});
socket.on('station:monitor:data', ({ station, stationId, newMessages }) => {
  // newMessages: Message[]
});
socket.emit('station:monitor:stop', 123);
```

## Event reference

### Server → client

| Event | Payload | Notes |
|-------|---------|-------|
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
