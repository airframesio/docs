---
sidebar_position: 2
---

# Receiver Systems

When building an aircraft tracking receiver system, you should first know what kind of data you are trying to receive and what your overall goals are.

## Choosing a starting point

If you're new to the hobby, start with **VHF ACARS or VDL2**. These require the least hardware investment (a single RTL-SDR and a basic VHF antenna) and will produce results quickly if you're near an airport or flight path. VDL2 typically produces more messages than VHF ACARS in busy areas.

If you want to track oceanic flights, **HFDL** is the most accessible option — it also uses a single SDR but with an HF antenna, and can receive position data from aircraft thousands of miles away.

**SATCOM** (Inmarsat AERO and Iridium) requires more specialized hardware (satellite dishes, L-Band LNAs) and is best tackled after you have experience with the simpler modes.

## Introductory/Exploratory System

Low cost, low commitment setups for getting started.

### Single SDR

A single SDR system requires you to pick one network to receive from. This is ideal if you want to minimize cost or are running on very limited hardware.

| Network | What you'll receive | Decoder | Antenna |
|---------|-------------------|---------|---------|
| ACARS | VHF ACARS messages from nearby aircraft | [acarsdec](/docs/decoders/install-acarsdec) | VHF whip or collinear |
| VDL2 | VDL Mode 2 digital messages | [dumpvdl2](/docs/decoders/install-dumpvdl2) | VHF whip or collinear |
| HFDL | HF data link from oceanic/remote aircraft | [dumphfdl](/docs/decoders/install-dumphfdl) | HF wire or loop antenna |
| AERO | Inmarsat satellite ACARS | [JAERO](/docs/decoders/clients) | Satellite dish + LNA |
| AoI | ACARS over Iridium | [iridium-toolkit](/docs/decoders/install-iridium-toolkit) | L-Band patch/helix + LNA |

### Double SDR

Two SDRs let you receive from two networks simultaneously. Popular combinations:

| Combination | Why this combo |
|------------|----------------|
| **ACARS + VDL2** | Maximum VHF coverage — captures both legacy and modern messages. Most popular starter combo. |
| **ACARS + HFDL** | Local VHF messages plus oceanic HF coverage |
| **VDL2 + HFDL** | High-volume digital VHF plus oceanic |
| **HFDL + HFDL** | Monitor two different HFDL ground stations simultaneously for broader HF coverage |

## Experienced Hobbyist System

For expanding coverage and contributing more data to the network.

### Triple SDR

Most computers can handle three SDRs, but a Raspberry Pi 3 may struggle. A Pi 4/5 or x86 mini PC is recommended.

| Combination | What it covers |
|------------|----------------|
| **ACARS + VDL2 + HFDL** | The "complete VHF + HF" setup — captures everything within VHF range plus oceanic HFDL |
| **ACARS + VDL2 + AERO** | VHF + satellite for maximum aircraft visibility |
| **VDL2 + HFDL + AERO** | Digital-focused with satellite coverage |

### Quadruple SDR and Beyond

Four or more SDRs require a capable system — a Raspberry Pi 4/5 with active cooling or an x86 mini PC like the [TRIGKEY N100](/docs/hardware). The USB bandwidth and CPU requirements increase significantly with each additional SDR.

At this level, consider running your setup with [Docker and ACARS Hub](/docs/feeding/Docker) for easier management of multiple decoder processes.

## Hardware recommendations

See the [Hardware](/docs/hardware) page for specific SDR, computer, antenna, and accessory recommendations.
