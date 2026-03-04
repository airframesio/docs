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

## Inmarsat Satellites

The Inmarsat constellation provides regional coverage via geostationary satellites positioned over major ocean regions:

| Satellite | Position | Coverage Area |
|-----------|----------|---------------|
| I-3 F5 / IOR | 25.0° E | Indian Ocean Region |
| I-4 F1 / AOR-E | 63.9° W | Atlantic Ocean Region - East |
| I-4 F3 / POR | 97.6° W | Pacific Ocean Region |
| I-3 F4 / WOR | 54.0° W | Atlantic Ocean Region - West |
| I-6 F1 | 63.5° E | Indian Ocean Region |
| I-6 F2 | 107.5° E | Asia-Pacific |

Your geographic location determines which satellites you can receive. In general, you need a clear line of sight to the satellite at its geostationary position.

## Receiving AERO SATCOM

Receiving Inmarsat AERO signals is more involved than VHF or HFDL reception, requiring a satellite dish, an LNA, and a capable SDR.

### L-Band Setup

| Component | Recommendation | Notes |
|-----------|---------------|-------|
| Antenna | Patch antenna, 7–10 turn helix, or small dish | A helix paired with an LNA gives good results. The RTL-SDR Discovery Dish is an excellent option if you have space. |
| LNA | [Nooelec SAWbird+ IR](/docs/hardware) | Filtered L-Band LNA. Essential for pulling weak satellite signals out of the noise. |
| SDR | [RTL-SDR Blog V4](/docs/hardware) or similar | Bias-tee power for the LNA is convenient. |
| Decoder | [JAERO](/docs/decoders/clients) | GUI-based Inmarsat AERO decoder with support for multiple channels. |

### C-Band Setup

C-Band reception yields richer data (including ADS-C position reports for oceanic tracking) but requires significantly more hardware:

| Component | Requirement | Notes |
|-----------|------------|-------|
| Antenna | 1.8m+ satellite dish | Must be accurately aimed at the target Inmarsat satellite. |
| LNB | GPSDO-locked LNB | Frequency stability is critical for C-Band decoding. |
| Mount | Elevation motor (minimum) | For 24-hour tracking as the satellite drifts slightly. |
| SDR | RTL-SDR or Airspy | Multiple SDRs can monitor different transponders simultaneously. |
| Decoder | [JAERO](/docs/decoders/clients) | Same decoder handles both L-Band and C-Band. |

### Resources

[thebaldgeek's documentation](https://thebaldgeek.github.io/) provides extensive guides for setting up both L-Band and C-Band reception stations and has been an invaluable resource for the community in this area. Decoded data can be fed to Airframes alongside your other feeds.
