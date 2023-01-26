---
sidebar_position: 3
---

# How to Feed

Feeding requires that you have active reception of aerospace data (coming from aircraft, ground stations, etc) already using one or more SDRs.

## Feeder Clients

Feeder clients are small pieces of software, often in the form of scripts, that take the output from your receiver software and shuttle the data off to a remote server.

Some feeder clients are sophisticated, in that they might filter and optimize what data is sent. Other feeder clients simply send everything completely unfiltered.

## AirwavesOS (formerly Airframes Receiver OS / AROS)

If you are using the [AirwavesOS](https://docs.airframes.io/docs/aros), feeder clients are already installed for most services and ready for you to configure as an `Output`. You are able to feed multiple aggregation services. This will be the easiest way to get going for just about everyone.

*In development.*

## ADSBExchange Distribution

If you are using the [ADSBExchange Raspberry Pi Image](https://www.adsbexchange.com/how-to-feed/), an [Airframes](https://airframes.io) feeder client has already been installed. You will need to configure a secondary SDR to use the Airframes feeder client.

*On hold.*

## Manually via Compilation of Clients

There are a few ways to install the necessary clients. At this moment we will not go into great detail, but here are some external resources:
* [thebaldgeek's awesome documentation](https://thebaldgeek.github.io/)
* [acarsdec](https://github.com/wiedehopf/adsb-wiki/wiki/acarsdec-install) via wiedehopf's install script

## Other Distributions

If you are using an OS distribution from one of the other aggregation services, you will need to install and/or configure a feeding client in order to feed your data to these services. The rule of thumb is that the aggregator that put together the OS distribution will likely have already included their own feeder client, but you will likely need to add the feeder clients for any other aggregation service that you would like to feed to.
