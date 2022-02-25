
# Receiver Systems

When building or purchasing an aircraft tracking receiver system, you should first know what kind of data you are trying to receive and what your overall goals are.

There are a couple of types of people who might want to put together a receiver system:

1. A person who is just getting into the hobby or wants to see what it's all about without putting a lot of money into it, would want to build a an introductory or exploratory system. Low cost, low commitment.
2. An experienced hobbyist who wants to expand coverage for the network with as many possible reception points as possible, would want to build a Experienced Hobbyist system. Higher cost, higher commitment.

## Introductory/Exploratory System

You might be someone who is just getting into the hobby and are not yet ready to invest a lot of money and time into it yet. You might not know all of the jargon and terms, but just have an interest in tracking aircraft. You might have heard about the project and just think it's cool and want to be a part of it. If that's you, then you'll want to start with a single or double SDR receiver system.

### Single SDR

A single SDR system has, as you guessed it, only a single SDR. This requires you to pick a specific radio network to listen and collect data from. This may be a requirement because you are limited on how much you want to spend, or because your very small embedded hardware would not be able to do more.

Networks that you can choose from:
- ACARS
- VDL
- HFDL
- AERO
- AOI


### Double SDR

A double SDR system will allow you to listen for aircraft data across multiple ACARS-related networks at the same time. Depending on your region, your equipment, and your interests, choose a pair of networks to use with your two SDRs.

Combinations of networks that you can receive data from simultaneously:
- ACARS + VDL
- ACARS + HFDL
- ACARS + AERO
- ACARS + AOI


## Experienced Hobbyist System


### Triple SDR


### Quadruple SDR

This is going to likely require a very powerful system. A Raspberry Pi 3 or 4 will not work for this. Too much data will be coming in on the USB ports from the SDR for the small embedded system to keep up, much less will it be able to then process and decode from all of the SDRs at the same time.
