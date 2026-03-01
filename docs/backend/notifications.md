---
sidebar_position: 2
---

# Notification System

When data comes through the [Aggregator](/docs/backend/aggregator), it is injected into the **Notification System** in the Airframes Standard Format (ASF). This service alerts other backend services about new data, enabling a pipeline of further processing.

## Message decoding

One key service that receives notifications processes the raw ACARS message text — looking to decode what often appears to be cryptic strings of characters into meaningful information. For example, a raw message like `FPN/RI:DA:KLAX:AA:KJFK` can be decoded into a flight plan route from Los Angeles to New York. When decoding succeeds, the results are stored and further notifications are emitted with the enriched data.

## Real-time delivery

Frontend clients, such as the [Airframes web application](https://app.airframes.io), can subscribe to notifications to display live message feeds and decoded data. This is what powers the real-time message view on the site — when a feeder sends a message to the aggregator, it can appear in your browser within seconds.

## Flight tracking

Another service processes position-bearing messages (ADS-C reports, OOOI events, and other location data) to build and maintain active flight tracks. These are displayed on the Airframes flights map and associated with aircraft and airline records.
