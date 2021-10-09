import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({ variant = "info", children }) {
  return (
    <div>
      <Alert variant={variant} style={{ fontSize: 12, marginTop: '2%' }}>
        <strong>{children}</strong>
      </Alert>
    </div>
  );
}

export default ErrorMessage;
