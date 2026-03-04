---
sidebar_position: 1
---

# Introduction to ACARS

ACARS (Aircraft Communications Addressing and Reporting System) is a digital communication system used to transmit and receive short messages between aircraft and ground-based systems. Developed in 1978 by ARINC, it was originally designed to automate routine communications between pilots and their airlines, replacing voice-based position reporting and reducing workload for both crews and dispatchers.

## Plain Old ACARS (POA)

The original ACARS system — often referred to as Plain Old ACARS, or POA — transmits over VHF (Very High Frequency) radio, primarily on frequencies like 129.125 MHz and 131.550 MHz. POA uses a relatively simple modulation scheme (AM MSK) with low data rates, but its simplicity and reliability have kept it in widespread use for nearly five decades.

POA is line-of-sight, meaning it works when the aircraft is within range of a VHF ground station. This limits its coverage to continental areas and near-coastal regions. For communication beyond VHF range, ACARS data is carried over other mediums — see the [Technology Overview](/docs/technology/overview) for the full landscape.

## What ACARS Carries

ACARS messages cover a wide range of aviation operations. Some of the most common message types include:

* **OOOI Reports** — Out, Off, On, In events that automatically log gate departure, takeoff, landing, and gate arrival times.
* **Position Reports** — Periodic latitude/longitude/altitude reports, especially important for oceanic flights.
* **Weather Data** — METARs, TAFs, NOTAMs, and PIREPs delivered to the cockpit.
* **Pre-Departure Clearances (PDC)** — Digital delivery of ATC clearances before pushback.
* **Free-Text Messages** — Airline operations, crew scheduling, gate changes, and other operational text.
* **Maintenance & Health Reports** — Engine parameters, fault codes, and airframe fatigue data transmitted in-flight.
* **CPDLC and ADS-C** — Controller-Pilot Data Link Communications and surveillance contracts used for air traffic management.

See the [Introduction](/docs/intro) for the full list of ACARS use cases.

## ACARS Frequencies

VHF ACARS operates on dedicated frequencies within the aviation VHF band. The primary frequencies vary by region:

### Common Frequencies

| Frequency | Region | Provider | Notes |
|-----------|--------|----------|-------|
| 129.125 MHz | Global | ARINC | Primary worldwide ACARS frequency |
| 130.025 MHz | USA / Canada | ARINC | Secondary North American channel |
| 130.425 MHz | USA | ARINC | Additional channel |
| 130.450 MHz | USA / Canada | ARINC | Additional channel |
| 131.125 MHz | USA | ARINC | Additional channel |
| 131.475 MHz | Japan | | Japan primary |
| 131.525 MHz | Europe | SITA | European secondary |
| 131.550 MHz | Global | SITA | Primary worldwide SITA channel |
| 131.725 MHz | Europe | SITA | European channel |

:::tip
You don't need to monitor all frequencies. Start with 129.125 and 131.550 — these two carry the majority of ACARS traffic worldwide. Add more channels as you learn which are active in your area. acarsdec can decode up to 8 channels simultaneously from a single SDR.
:::

## Receiving ACARS

VHF ACARS is the easiest entry point for hobbyists. A basic [RTL-SDR dongle](/docs/hardware), a VHF antenna, and the [acarsdec](/docs/decoders/install-acarsdec) decoder are all you need to start receiving and decoding live ACARS messages in your area. Once decoded, you can [feed the data to Airframes](/docs/feeding/what) to contribute to the global network.

### Quick Start

1. **Get hardware** — An [RTL-SDR Blog V4](/docs/hardware) or [Orange SDR](/docs/hardware) and any VHF antenna (even a 53 cm wire works for testing).
2. **Install acarsdec** — Follow the [installation guide](/docs/decoders/install-acarsdec).
3. **Start decoding** — Run acarsdec tuned to 129.125 and 131.550 MHz.
4. **Feed Airframes** — Configure the output to send data to the Airframes [aggregator](/docs/feeding/how).

See the [Getting Started](/docs/getting_started) guide for a full walkthrough.
