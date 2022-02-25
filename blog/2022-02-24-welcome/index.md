---
slug: welcome
title: Welcome to Airframes
authors: [kevinelliott]
tags: [hello, airframes]
---

[Airframes](https://app.airframes.io) is an aerospace data aggregation service that has been in development for some time now, intended to augment the data that services such as [ADSBExchange](https://adsbexchange.com) already aggregate and present.

So while Airframes is not brand new, this post serves to reconnect with the community and lay down some intentions, goals, and elaborate on some work in progress.

What differentiates [Airframes](https://app.airframes.io) from other aggregation services is that it focused on **ACARS**, or *Aircraft Communications Addressing and Reporting System* (which is predominantly for various aircraft systems and services to report and communicate statuses) instead of **ADS**, or *Automatic Dependent Surveillance* (which is primarily for communicating basic aircraft location data).

Today, existing services (such as [ADSBExchange](https://adsbexchange.com)) are aggregating variations of **ADS**:
- `ADS-B`
- `UAT`
- `ADS-C`

These aerospace communications standards are in use by every major airline and military organization to transmit real-time location information of their fleets from the air. It is a requirement by law in most countries (with some exceptions), and thus it is prevalent.

The following variations of **ACARS** are being actively developed & aggregated by [Airframes](https://airframes.io):
- `ACARS`
- `VDL`
- `HFDL`
- `AERO`
- `AOI`

These communication mediums deliver enhanced details, above and beyond aircraft positions, such as:
- aircraft key events (OOOI, etc)
- route changes
- emergency communications
- pilot to pilot text messages
- pilot to headquarters text messages
- and yes, even locations

Aggregating, processing, and otherwise making available this information will be a fruitful endeavor for feeders and consumers. It will help further color and detail what is happening during flights from start to finish. If you are feeding ADS-B/UAT to one or more services already, consider adding another receiver and feeding [Airframes](https://airframes.io) today.

![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)

The blog supports tags as well!

**And if you don't want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config.
