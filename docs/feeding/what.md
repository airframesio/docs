---
sidebar_position: 1
---

# What is Feeding?

The term **feeding** describes the process of receiving aviation data with your own equipment and sending it to a remote aggregation service for processing and distribution.

When you use your SDR to capture aircraft data from the sky and send it to [Airframes](https://airframes.io), you are **feeding** data to us. From the perspective of the Airframes service, your receiver station is a **feeder** because it is feeding data to it. Your **feed** contains data that was captured by your receiver from aircraft in its vicinity.

## How it works

```
Aircraft ──radio signal──► Your Antenna ──► SDR ──► Decoder Software ──► Airframes
```

1. An aircraft transmits an ACARS message over radio (VHF, HF, or satellite).
2. Your antenna receives the signal and passes it to your SDR (Software Defined Radio).
3. A decoder client (like [acarsdec](/docs/decoders/install-acarsdec), [dumpvdl2](/docs/decoders/install-dumpvdl2), or [dumphfdl](/docs/decoders/install-dumphfdl)) converts the raw radio signal into structured data.
4. The decoded message is sent over the internet to the [Airframes aggregator](/docs/backend/aggregator) at `feed.airframes.io`.
5. Airframes processes, stores, and makes the data available through [app.airframes.io](https://app.airframes.io).

## What gets sent

The data you feed contains decoded ACARS messages — short text-based communications between aircraft and ground systems. This includes things like position reports, weather requests, maintenance alerts, and operational messages. See the [Introduction](/docs/intro) for a full list of ACARS message types.

Your feed also includes metadata like the frequency the message was received on, the signal level, and your station identifier — which helps Airframes correlate and deduplicate messages from multiple feeders receiving the same transmission.
