---
sidebar_position: 1
---

# Aggregator

For most [Airframes](https://airframes.io) users and feeders, the aggregation service is a black box that their data is sent to and things magically happen to that data.

But a lot more is going on behind the scenes than you would think. The aggregator is just one of many services that are running in the backend infrastructure.

## How data flows in

Feeders send decoded ACARS messages to the aggregator at `feed.airframes.io` on specific **ports**, each corresponding to a data type and protocol:

| Port | Data Type | Protocol |
|------|-----------|----------|
| 5550 | VHF ACARS | UDP |
| 5552 | VDL2 | UDP |
| 5553 | VDL2 | TCP |
| 5556 | HFDL | UDP/TCP |

## Ingests

The aggregator is composed of **ingests**, and each ingest is responsible for handling a specific type of data from a specific source in a specific format. Each ingest:

1. Receives raw decoded messages from feeders
2. Validates and deduplicates the data (the same aircraft message may be received by multiple feeders)
3. Enriches the data with aircraft, airline, and flight information
4. Transforms the data into a common format called the **Airframes Standard Format** (or **ASF**)

## Airframes Standard Format (ASF)

The ASF is the internal representation used across all Airframes backend services. Once data is in ASF, any service in the infrastructure can process it without needing to understand the specifics of each decoder or transmission medium. This abstraction is what allows Airframes to support VHF ACARS, VDL2, HFDL, and SATCOM data through a unified pipeline.

## What happens next

Once in the ASF, the data is sent to the **[Notification System](/docs/backend/notifications)** that alerts other services in the infrastructure about the new data. These services handle tasks like message text decoding, flight tracking, storage, and real-time delivery to the web application.
