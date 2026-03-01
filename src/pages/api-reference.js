import React from 'react';
import Layout from '@theme/Layout';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiReference() {
  return (
    <Layout
      title="API Reference"
      description="Complete API documentation for the Airframes REST API">
      <div style={{ padding: '20px' }}>
        <h1>Airframes API Reference</h1>
        <p>
          Complete interactive documentation for the Airframes REST API. 
          You can explore all endpoints, view request/response schemas, and even test API calls directly from this page.
        </p>
        <SwaggerUI
          url="/api/openapi.yaml"
          docExpansion="list"
          defaultModelsExpandDepth={2}
          defaultModelExpandDepth={2}
          tryItOutEnabled={true}
          displayRequestDuration={true}
          filter={true}
          showExtensions={true}
          showCommonExtensions={true}
        />
      </div>
    </Layout>
  );
}
