---
sidebar_position: 1
---

# Aggregator

For most [Airframes](https://airframes.io) users and feeders, the aggregation service is a black box that their data is sent to and things magically happen to that data.

But a lot more is going on behind the scenes than you would think. The aggregator is just one of many services that are running in the backend infrastructure.

Data is sent to specific **ports** (for example *5000*) on the aggregation service. Each of these ports corresponds to a specific type of data, gathered from a specific type of source, sent in a specific format.

The aggregator is composed of **ingests**, and each ingest is responsible for handling each of these types of data. Each ingest understands the context of the data, and then further manipulates that data into a common format we call **Airframes Standard Format** (or **ASF**).

Once in the ASF, the data is sent to the **[Notification System](/docs/backend/notifications)** that alerts other services in the infrastructure about the new data. Since the data is in the ASF, these services will not have to do anything special to process the data again, except where the extended data provides additional value.
