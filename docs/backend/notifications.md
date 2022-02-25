
# Notification System

When data comes through the Aggregator, data is injected into the **Notification System** in the Airframes Standard Format. This service alerts other services in the infrastructure about the new data. Since the data is in the ASF, it does not have to do anything special to process the data again, except where the extended data provides value.

One service that is notified will process raw message text looking to further parse what appears to be cryptic goobledygook. If successful, it will store these decodings further, and continue to notify with the results.

Other services, such as frontend web browsers, can be notified as well, often to see live feeds or decodings. Sometimes these decodings are provided by the backend, and sometimes they are determined by the client itself.
