# Decoder Developers

If you are the author of a decoder client, here are some suggestions to you in order to better assist us with aggregation from users of your software.

1. Allow JSON output of decoded content. This is really a must because it is preferable over strictly defined columnar or custom string formats for ingestion.
2. Allow for sending the JSON output to one or more TCP destinations. This is helpful because users will not need to use wrapper scripts or pipe outputs to reach our ingests.
3. Include a top level `source` attribute that describes the source of the decoding as an object. In this, include an `app` attribute that describes your software as an object with attributes `name` and `version`. Also, include a `station_id` attribute that allows for at least 36 characters, to support a station name or UUID.

## Example

Here is an example JSON of a decoder client outputting an ACARS message.

```json
{
  "source": {
    "app": {
      "name": "FakeACARSDecoder",
      "version": "1.0.0"
    },
    "station_id": "KE-FAKEFEED-1"
  },
  "acars": { ... }
}
