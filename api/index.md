---
sidebar_position: 1
---

# API Overview

The Airframes REST API provides access to aggregated and processed aviation data from our global network of ACARS receivers. Our API allows authorized users to query real-time and historical aircraft communications, flight data, and station information.

## API Specification

🚀 **[Interactive API Reference](/api-reference)** - Complete interactive API documentation with live testing capabilities.

📋 **[View OpenAPI Specification](./openapi.yaml)** - Raw OpenAPI YAML specification file.

## Authentication & Access

All API requests require an API key. See the [Authentication](./authentication.md) page for details on obtaining and using API keys.

There are two classifications of authorized API users:

### **Feeders**
Users who run a receiver that contributes data in real-time to Airframes with a measure of *validated data* will receive a minimal, yet useful, free API account.

### **Customers**
Paying users/subscribers will be able to access the API in relation to their subscription tier. Initially this will be a nominal fee with no feeder requirement.

See [Pricing](./pricing.md) for current access tiers.

## Available Endpoints

Our API provides access to:

- **Messages** - ACARS messages, OOOI reports, and aircraft communications
- **Flights** - Active and historical flight information
- **Aircraft** - Airframe data and registration details
- **Airlines** - Airline information and ICAO/IATA codes
- **Airports** - Airport data and location information
- **Stations** - Feeder station data and statistics
- **Routes** - Flight route and waypoint information

## Getting Started

1. Review the [OpenAPI specification](./openapi.yaml) for detailed endpoint documentation
2. Contact us for API access and authentication credentials
3. Start making requests to our REST endpoints

## Base URLs

- **Production**: `https://api.airframes.io/v1`
- **Staging**: `https://staging.airframes.io/v1`

For more information about API access, please see our [contact page](./contact.md).
