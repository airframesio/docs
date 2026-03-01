---
sidebar_position: 1
---

# Introduction to AoA (ACARS over AERO)

ACARS over AERO refers to ACARS data transmitted via the Inmarsat satellite constellation's aeronautical services. This provides air-ground communication for aircraft flying over oceans and remote areas beyond VHF or even HF coverage.

## How It Works

The Inmarsat constellation consists of geostationary satellites providing coverage over the Atlantic, Pacific, and Indian Ocean regions. Aircraft equipped with SATCOM avionics connect to these satellites to send and receive ACARS messages, ADS-C position reports, and CPDLC communications.

There are two primary bands used:

* **L-Band** — One of two bands for aeronautical SATCOM. Aircraft position data is not part of this satcom mode since the data source is ground-based (typically dispatch operators) originating. L-Band signals from Inmarsat satellites can be received with a relatively modest patch antenna. Better is a 7- to 10-turn helix with Nooelec LNA. A dish antenna (around 1 meter or larger) and an appropriate LNA (Low Noise Amplifier) will give the best results. Currently, the RTLSDR Discovery Dish is the best option if you have the space. Software such as [JAERO](/docs/decoders/clients) decodes these signals.
* **C-Band** — Used for the satellite-to-ground station feeder links. C-Band reception requires a larger dish (typically 1.8 meters or more) but can yield a rich data set since it carries the ADS-C messages, which means oceanic aircraft positions can be plotted via the basestation format on the usual tar1090 maps. The dish will require a GPSDO LNB and at least an elevation motor control for tracking if 24-hour coverage is desired.

## What It Carries

AERO SATCOM carries a rich set of ACARS data, including ADS-C position reports (which provide latitude, longitude, altitude, heading, and speed for aircraft over oceans), CPDLC messages between controllers and pilots, airline operational communications, and standard ACARS traffic.

## Receiving AERO SATCOM

Receiving Inmarsat AERO signals is more involved than VHF or HFDL reception, requiring a satellite dish, an LNA, and a capable SDR. [thebaldgeek's documentation](https://thebaldgeek.github.io/) provides extensive guides for setting up both L-Band and C-Band reception stations and has been an invaluable resource for the community in this area. Decoded data can be fed to Airframes alongside your other feeds.
