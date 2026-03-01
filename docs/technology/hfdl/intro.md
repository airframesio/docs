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

## Receiving HFDL

HFDL reception requires an HF-capable SDR or receiver and an appropriate HF antenna. The primary decoder used for HFDL is [dumphfdl](/docs/decoders/clients), which decodes HFDL transmissions and outputs structured data that can be fed to Airframes and other aggregators.

HFDL ground stations operate across a range of frequencies (roughly 2–22 MHz), and a single receiver can typically monitor multiple frequencies on a single ground station simultaneously. For broader coverage, multiple SDRs can be used to monitor several ground stations at once.
