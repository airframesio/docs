---
sidebar_position: 2
---

# Introduction to AoI (ACARS over Iridium)

ACARS over Iridium (AoI) transmits ACARS data through the Iridium satellite constellation, a network of Low Earth Orbit (LEO) satellites that provides true global coverage — including the polar regions that geostationary satellites like Inmarsat cannot reach.

## How It Works

The Iridium constellation consists of 66 active LEO satellites orbiting at approximately 780 km altitude. Unlike geostationary satellites which remain fixed over the equator, Iridium satellites orbit the Earth and hand off connections as they pass overhead, providing seamless coverage everywhere on the planet.

Aircraft equipped with Iridium SATCOM transceivers use this network to send and receive ACARS messages when other communication links are unavailable or as a supplementary path.

## What It Carries

AoI carries standard ACARS messages as well as safety-of-flight communications. It is particularly significant for aircraft operating in polar regions (such as transpolar routes between North America and Asia) where neither VHF, HFDL, nor Inmarsat provide reliable coverage.

## Receiving Iridium

Iridium signals operate in L-Band (around 1616–1626.5 MHz) and can be received with a suitable antenna and SDR. Because Iridium satellites are in LEO and constantly moving, reception requires a wide-beam or omnidirectional antenna with clear sky visibility rather than a pointed dish.

### Hardware Requirements

| Component | Recommendation | Notes |
|-----------|---------------|-------|
| SDR | [HackRF One](/docs/hardware) or RTL-SDR with bias-tee | HackRF recommended for its 20 MHz bandwidth; RTL-SDR works but captures fewer channels |
| LNA | [Nooelec SAWbird+ IR](/docs/hardware) | Filtered LNA tuned for Iridium L-Band frequencies. Essential for clean signal. |
| Antenna | L-Band patch or helix | Must have wide beamwidth to track LEO satellites overhead. A simple patch antenna with clear sky view works well. |

### Software Pipeline

Iridium decoding is a two-stage process:

1. **Demodulation** — [iridium-sniffer](/docs/decoders/clients) (or gr-iridium) captures raw Iridium bursts from the SDR and extracts frames. iridium-sniffer is the recommended option as it is lightweight and runs well on Raspberry Pi hardware without GNU Radio.
2. **Decoding** — [iridium-toolkit](/docs/decoders/install-iridium-toolkit) parses the demodulated frames and extracts ACARS messages for feeding to Airframes.

### Tips for Iridium Reception

- **Sky visibility matters** — Place your antenna with the widest possible view of the sky. Rooftops, balconies, and open fields work best.
- **Satellite passes are constant** — Unlike geostationary satellites, Iridium sats orbit every ~100 minutes. There are always satellites overhead, so reception is continuous once set up.
- **Polar coverage** — Iridium is the only ACARS medium that covers the poles. If you're located at high latitudes, your Iridium feed is especially valuable to the network.
