---
sidebar_position: 1
---

# Technology Overview

## The ACARS Landscape

ACARS (Aircraft Communications Addressing and Reporting System) has been the backbone of digital air-ground communication since 1978. Originally developed by ARINC as a simple way to automate routine pilot-to-airline communications, ACARS has evolved into a diverse ecosystem of transmission mediums, protocols, and applications that touch nearly every aspect of modern aviation operations.

### Transmission Mediums at a Glance

| Medium | Frequency | Range | Decoder | Difficulty |
|--------|-----------|-------|---------|------------|
| VHF ACARS (POA) | 129–131 MHz | Line-of-sight (~200 nm) | [acarsdec](/docs/decoders/install-acarsdec) | Beginner |
| VDL Mode 2 | 136–137 MHz | Line-of-sight (~200 nm) | [dumpvdl2](/docs/decoders/install-dumpvdl2) | Beginner |
| HFDL | 2–22 MHz | Thousands of miles | [dumphfdl](/docs/decoders/install-dumphfdl) | Intermediate |
| Inmarsat AERO (L-Band) | ~1.5 GHz | Geostationary coverage | [JAERO](/docs/decoders/clients) | Advanced |
| Inmarsat AERO (C-Band) | ~3.4–4.2 GHz | Geostationary coverage | [JAERO](/docs/decoders/clients) | Expert |
| Iridium (AoI) | ~1.6 GHz | Global (incl. polar) | [iridium-toolkit](/docs/decoders/install-iridium-toolkit) | Advanced |

### Transmission Mediums

ACARS data doesn't travel over a single radio link. It spans multiple transmission mediums, each with different characteristics, coverage areas, and use cases:

* **VHF ACARS (Plain Old ACARS / POA)** — The original and most common form. Operates on VHF frequencies (primarily 129.125 MHz and 131.550 MHz) with line-of-sight range. This is what most hobbyists start with.
* **VDL (VHF Data Link)** — A digital evolution of VHF ACARS with higher throughput and efficiency. VDL Mode 2 is the most widely deployed, operating in the 118–136.975 MHz range.
* **HFDL (HF Data Link)** — Uses High Frequency radio for long-range communication, particularly over oceans and polar regions where VHF coverage doesn't reach. A network of ground stations worldwide provides global coverage.
* **SATCOM (Satellite Communications)** — Encompasses multiple satellite-based systems:
  * **Inmarsat AERO (L-Band and C-Band)** — Geostationary satellite-based ACARS, providing coverage over oceans and remote areas via the Inmarsat constellation.
  * **Iridium (ACARS over Iridium / AoI)** — Uses the Iridium LEO satellite constellation for true global coverage, including polar regions.

### Service Providers

Two major data link service providers manage the global ACARS network infrastructure:

* **ARINC (now Collins Aerospace / RTX)** — The original ACARS developer and primary service provider, particularly in the Americas.
* **SITA** — The other major global provider, with strong presence in Europe and Asia-Pacific.

### Modern Evolution

The ACARS landscape continues to evolve:

* **ACARS over IP (AoIP)** — The newest transport option, leveraging broadband cellular connectivity on the ground and IP-capable SATCOM in the air. This addresses growing data volume demands as next-generation aircraft generate up to four times the ACARS data of their predecessors.
* **FANS (Future Air Navigation System)** — Enables direct controller-pilot datalink communications (CPDLC) and ADS-C (Automatic Dependent Surveillance - Contract) position reporting over ACARS, critical for oceanic and remote airspace management.
* **Integration with NextGen/SESAR** — ACARS is being integrated with next-generation air traffic management systems for increased automation and real-time analytics.

## What Airframes Captures

Airframes aggregates data across all of these transmission mediums. Our feeder network uses software-defined radios (SDRs) to receive signals that are then decoded by clients like [acarsdec](/docs/decoders/clients), [dumpvdl2](/docs/decoders/clients), [dumphfdl](/docs/decoders/clients), [JAERO](/docs/decoders/clients), and others. This decoded data is sent to the Airframes [aggregator](/docs/backend/aggregator) for processing, storage, and distribution.

For a deeper look at each technology, see the individual sections on [ACARS](/docs/technology/acars/intro), [VDL](/docs/technology/vdl/intro), [HFDL](/docs/technology/hfdl/intro), and [SATCOM](/docs/technology/satcom/aero/intro).

:::tip New to ACARS?
Start with VHF ACARS or VDL2 — they need only an inexpensive RTL-SDR and a simple antenna. See [Getting Started](/docs/getting_started) or [Receiver Systems](/docs/technology/receiver-systems) for guidance on choosing your first setup.
:::
