---
sidebar_position: 3
---

# Using Airframes

The Airframes web application at [app.airframes.io](https://app.airframes.io) is where you can explore the ACARS data collected by the global feeder network. This guide covers the main features of the application.

## Live Messages

The [Messages](https://app.airframes.io/messages) page shows ACARS messages as they arrive in real-time from feeders around the world. Each message includes:

- **Timestamp** — When the message was received
- **Flight** — The flight number or callsign
- **Tail** — The aircraft registration (tail number)
- **Label** — The ACARS message label indicating its type (e.g., `H1` for message acknowledgment, `SA` for weather)
- **Text** — The decoded message content
- **Source** — Which feeder station received the message and on which medium (ACARS, VDL2, HFDL, etc.)

You can filter messages by text content, flight number, tail number, or message label.

### Historical search

The [Historical Messages](https://app.airframes.io/messages/historical) page lets you search through past messages with the same filtering options. This is useful for researching specific flights, aircraft, or events.

## Flights

The [Flights](https://app.airframes.io/flights) page shows active flights that have been seen via ACARS data. Unlike ADS-B-based flight trackers, Airframes tracks flights based on their ACARS communications — this means you can see flights that are communicating over HFDL or satellite links even when they're over oceans and outside ADS-B coverage.

### Live Map

The flights map plots aircraft positions derived from ACARS position reports, ADS-C surveillance data, and other location-bearing messages. This provides a complementary view to ADS-B, especially for oceanic and polar routes.

## Stations

The [Stations](https://app.airframes.io/stations) page shows all active feeder stations. For each station you can see:

- **Station ID** — The feeder's identifier
- **Location** — Where the station is located (if provided)
- **Message counts** — How many messages have been received in the last 24 hours, broken down by type
- **Last seen** — When the station last sent data

This page is useful for:
- **Verifying your own feed** — Search for your station ID to confirm Airframes is receiving your data
- **Checking coverage** — See where feeders exist and identify gaps in coverage
- **Finding frequencies** — See what frequencies other feeders in your region are using

## Airframes

The [Airframes](https://app.airframes.io/airframes) section provides aircraft data. You can look up individual aircraft by:

- **Tail number** (registration) — e.g., N842UA
- **ICAO hex code** — The Mode S transponder address

Each aircraft record shows associated ACARS messages and flight history as seen through the Airframes network.

## Airlines

The [Airlines](https://app.airframes.io/airlines) section lets you browse airlines by ICAO or IATA code and see the ACARS message activity associated with each carrier.

## About Page

The [About](https://app.airframes.io/about) page contains current information about the Airframes project, including links to resources for setting up feeders, common frequencies by region, and community links.

## Tips

- **Bookmark specific filters** — The URL updates as you apply filters on the Messages page, so you can bookmark a filtered view (e.g., all messages for a specific tail number) for quick access later.
- **Time zones** — All timestamps in the application are displayed in UTC. Keep this in mind when correlating with local flight schedules.
- **Message labels** — ACARS message labels like `H1`, `SA`, `5Z`, etc. indicate the message type. See the [Glossary](/docs/glossary) for common terms or explore the [ACARS message documentation](https://github.com/airframesio/acars-message-documentation) for label details.
