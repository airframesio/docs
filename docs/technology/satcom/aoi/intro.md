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

Iridium signals operate in L-Band (around 1616–1626.5 MHz) and can be received with a suitable antenna and SDR. The [iridium-toolkit](/docs/decoders/install-iridium-toolkit) is used to decode Iridium signals, extracting ACARS and other data from the downlink. Because Iridium satellites are in LEO and constantly moving, reception requires a wide-beam or omnidirectional antenna with clear sky visibility rather than a pointed dish.
