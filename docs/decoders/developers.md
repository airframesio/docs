---
sidebar_position: 10
---

# Decoder Developer Guidelines

If you are the author of a decoder client and want your software to be compatible with Airframes, here are the guidelines for integration.

## Requirements

### 1. JSON output

Allow JSON output of decoded content. This is essential because JSON is the format Airframes ingests expect. Columnar or custom string formats cannot be processed by our aggregator.

### 2. Network output destinations

Allow sending JSON output to one or more TCP or UDP destinations. This lets users feed aggregation services directly from the decoder without needing wrapper scripts or piped output. Supporting multiple simultaneous destinations (e.g., Airframes + a local logger) is ideal.

### 3. Station identification

Include a `station_id` field that supports at least 36 characters, to accommodate both human-readable station names and UUIDs (which we plan to adopt in the future).

### 4. Source metadata

Include a top-level `source` attribute that describes the decoder software. This helps Airframes identify the data source and handle any decoder-specific quirks.

## Example JSON output

Here is an example of the expected JSON structure for a decoded ACARS message:

```json
{
  "source": {
    "app": {
      "name": "FakeACARSDecoder",
      "version": "1.0.0"
    },
    "station_id": "KE-KSEA-ACARS"
  },
  "timestamp": 1516206744.18,
  "channel": 2,
  "freq": 130.025,
  "level": -22,
  "error": 0,
  "mode": "2",
  "label": "H1",
  "block_id": "6",
  "ack": false,
  "tail": ".N842UA",
  "flight": "UA1412",
  "msgno": "D04G",
  "text": "POSN43200W078000,ELDS,215721,350,CYUL,KJFK",
  "end": true
}
```

## Existing implementations

For reference, these decoders already output Airframes-compatible JSON:

- [acarsdec](https://github.com/TLeconte/acarsdec) — `-o 4 -j host:port`
- [dumpvdl2](https://github.com/szpajder/dumpvdl2) — `--output decoded:json:udp:address=host,port=port`
- [dumphfdl](https://github.com/szpajder/dumphfdl) — `--output decoded:json:udp:address=host,port=port`

## Questions?

If you're developing a decoder and have questions about Airframes integration, reach out on the [Airframes Discord](https://discord.gg/airframes) or email [api@airframes.io](mailto:api@airframes.io).
