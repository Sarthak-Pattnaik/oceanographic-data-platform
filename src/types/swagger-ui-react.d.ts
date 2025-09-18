declare module "swagger-ui-react" {
  import * as React from "react";

  interface SwaggerUIProps {
    url?: string;
    spec?: object;
    defaultModelsExpandDepth?: number;
    docExpansion?: "list" | "full" | "none";
    deepLinking?: boolean;
    presets?: any[];
    layout?: string;
  }

  const SwaggerUI: React.FC<SwaggerUIProps>;
  export default SwaggerUI;
}
