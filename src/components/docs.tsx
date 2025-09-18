import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Docs: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>API Docs</h1>
      <SwaggerUI url="/openapi.json" />
    </div>
  );
};

export default Docs;
