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

## Receiving ACARS

VHF ACARS is the easiest entry point for hobbyists. A basic RTL-SDR dongle, a VHF antenna, and the [acarsdec](/docs/decoders/install-acarsdec) decoder are all you need to start receiving and decoding live ACARS messages in your area. Once decoded, you can [feed the data to Airframes](/docs/feeding/what) to contribute to the global network.
