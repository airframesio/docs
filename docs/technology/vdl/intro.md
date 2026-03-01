---
sidebar_position: 1
---

# Introduction to VDL

VDL (VHF Data Link) is a digital communication system used for air-to-ground and ground-to-air data exchange in aviation. It operates in the VHF frequency range (118–136.975 MHz) and represents a significant upgrade over the original analog ACARS system.

## VDL Mode 2

VDL Mode 2 (VDL2) is the most widely deployed variant and the one relevant to Airframes. It uses a digital modulation scheme (D8PSK) that provides higher data throughput than Plain Old ACARS (POA), allowing more messages to be transmitted in less time and with greater reliability.

VDL2 carries the same types of ACARS messages as POA — OOOI reports, position reports, weather data, free-text messages, CPDLC, and more — but over a more efficient digital link.

## Differences between POA and VDL2

| Feature | Plain Old ACARS (POA) | VDL Mode 2 |
|---------|----------------------|-------------|
| Modulation | AM-MSK (analog) | D8PSK (digital) |
| Data rate | 2,400 bps | 31,500 bps |
| Era | 1978 | Late 1990s |
| Efficiency | Low — one message per channel at a time | Higher — better channel utilization |
| Error correction | Basic | More robust |
| Decoder | [acarsdec](/docs/decoders/install-acarsdec) | [dumpvdl2](/docs/decoders/install-dumpvdl2) |

In practice, many airlines and aircraft use both POA and VDL2 simultaneously. VDL2 is increasingly the primary link for newer aircraft, while POA remains in use for backwards compatibility and in regions where VDL2 infrastructure is less developed.

## VDL2 Frequencies

VDL2 operates on dedicated channels within the aviation VHF band. The Common Signalling Channel (CSC) at **136.975 MHz** is used worldwide for initial link establishment.

### Key frequencies

| Frequency | Region | Provider |
|-----------|--------|----------|
| 136.650 MHz | North America | ARINC |
| 136.700 MHz | North America | ARINC |
| 136.725 MHz | Europe | ARINC |
| 136.775 MHz | Europe | SITA |
| 136.800 MHz | North America | SITA |
| 136.825 MHz | Europe | ARINC |
| 136.875 MHz | Europe | SITA |
| 136.975 MHz | Worldwide | CSC (ARINC & SITA) |

## Receiving VDL2

VDL2 reception uses the same VHF antenna and RTL-SDR hardware as POA ACARS. The recommended decoder is [dumpvdl2](/docs/decoders/install-dumpvdl2), which can decode multiple VDL2 channels simultaneously. VDL2 typically produces a higher volume of messages than POA, especially near busy airports.

See the [dumpvdl2 installation guide](/docs/decoders/install-dumpvdl2) for complete setup instructions including feeding to Airframes.
