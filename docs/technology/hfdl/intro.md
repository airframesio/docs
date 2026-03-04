---
sidebar_position: 1
---

# Introduction to HFDL

HFDL (High Frequency Data Link) is a communication system that transmits ACARS messages over HF (High Frequency) radio waves, providing long-range air-ground data communication where VHF coverage is unavailable — primarily over oceans, polar regions, and remote continental areas.

## How HFDL Works

Unlike VHF-based ACARS which is limited to line-of-sight range, HF radio signals can bounce off the ionosphere and travel thousands of miles. HFDL exploits this property through a global network of ground stations that provide near-worldwide coverage. Aircraft connect to the nearest available ground station and exchange ACARS messages over the HF link.

The HFDL network consists of ground stations distributed across the globe, each operating on multiple HF frequencies. Aircraft and ground stations negotiate which frequency to use based on current propagation conditions, time of day, and distance.

## What HFDL Carries

HFDL carries standard ACARS messages as well as ADS-C (Automatic Dependent Surveillance - Contract) position reports and CPDLC (Controller-Pilot Data Link Communications) messages. This makes HFDL particularly valuable for tracking aircraft over oceans where no radar coverage exists. Position reports received via HFDL can show aircraft crossing the Atlantic, Pacific, and polar routes in near real-time.

## HFDL Ground Stations

The HFDL network is operated by a set of ground stations distributed around the world. Each station operates on multiple HF frequencies and the active frequencies rotate throughout the day as ionospheric propagation conditions change. Key ground stations include:

| ID | Location | Region |
|----|----------|--------|
| 1 | San Francisco, USA | North America |
| 2 | Molokai, Hawaii, USA | Pacific |
| 3 | Reykjavik, Iceland | North Atlantic |
| 4 | Riverhead, New York, USA | North America |
| 5 | Auckland, New Zealand | South Pacific |
| 6 | Hat Yai, Thailand | Southeast Asia |
| 7 | Shannon, Ireland | North Atlantic / Europe |
| 8 | Johannesburg, South Africa | Africa |
| 9 | Barrow, Alaska, USA | Arctic / North Pacific |
| 10 | Muan, South Korea | East Asia |
| 11 | Albrook, Panama | Central America |
| 13 | Santa Cruz, Bolivia | South America |
| 14 | Krasnoyarsk, Russia | Central Asia |
| 15 | Al Muharraq, Bahrain | Middle East |
| 16 | Agana, Guam | Western Pacific |
| 17 | Canarias, Spain | Eastern Atlantic |

Use [hfdl.observer](https://hfdl.observer) to see which stations and frequencies are currently active.

## Receiving HFDL

HFDL reception requires an HF-capable SDR or receiver and an appropriate HF antenna. The primary decoder used for HFDL is [dumphfdl](/docs/decoders/clients), which decodes HFDL transmissions and outputs structured data that can be fed to Airframes and other aggregators.

HFDL ground stations operate across a range of frequencies (roughly 2–22 MHz), and a single receiver can typically monitor multiple frequencies on a single ground station simultaneously. For broader coverage, multiple SDRs can be used to monitor several ground stations at once.

### Getting Started with HFDL

1. **Antenna** — An HF wire antenna (random wire, end-fed, or loop) at least 10 meters long, as high as possible. Even a simple wire thrown over a tree can produce results.
2. **SDR** — Any RTL-SDR with HF capability (such as the [RTL-SDR Blog V4](/docs/hardware) with its built-in upconverter) or a dedicated HF SDR.
3. **Decoder** — [dumphfdl](/docs/decoders/install-dumphfdl) configured to monitor a nearby ground station.
4. **Frequency management** — Use [HFDLObserver](/docs/technology/hfdl/apps) to automatically keep your frequency list current as propagation changes.

See the [dumphfdl installation guide](/docs/decoders/install-dumphfdl) for complete setup instructions.
