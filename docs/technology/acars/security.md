---
sidebar_position: 2
---

# ACARS Security

ACARS was designed in the late 1970s with no encryption or authentication mechanisms. Messages are transmitted in plaintext over radio frequencies that anyone can receive with commodity hardware. This has implications for both aviation security and passenger privacy.

## Key Concerns

- **No encryption** — ACARS messages are sent unencrypted. Anyone with an SDR and the right software can decode them.
- **No authentication** — There is no built-in mechanism to verify the sender of an ACARS message, which has been a subject of security research.
- **Privacy** — Position reports, flight details, and operational messages are openly broadcast and can be correlated with specific aircraft and flights.

## Research

- [Undermining Privacy in the Aircraft Communications Addressing and Reporting System (ACARS)](https://doi.org/10.1515/popets-2018-0023) — Analyzes privacy implications of the ACARS system and the data it exposes.

## Why This Matters for Airframes

The openness of ACARS is what makes community-driven aggregation possible. Airframes collects data that is already freely broadcast over public radio frequencies. However, the community should be aware that ACARS data can contain operationally sensitive information, and we encourage responsible use of the data.

Airframes maintains an unfiltered approach to data collection — we do not censor or hide data based on corporate or governmental pressure — while recognizing that the aviation industry is actively working on securing future data link systems.

## The Future

Several efforts are underway to improve ACARS security:

- **AeroMACS** — An aviation adaptation of WiMAX that provides encrypted ground communications at airports
- **LDACS** — L-Band Digital Aeronautical Communications System, designed with security built in from the start
- **ACARS over IP (AoIP)** — Modern IP-based transport that can leverage standard encryption (TLS)
- **ATN/OSI and ATN/IPS** — Aeronautical Telecommunication Network standards that include authentication and encryption provisions

These newer systems will eventually reduce the amount of unencrypted ACARS traffic, but the transition is gradual and legacy POA/VDL2/HFDL will remain in use for years to come.
