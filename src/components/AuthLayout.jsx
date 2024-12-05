import React from "react";

function Protected({ children, authenticated = true }) {
  return <>{children}</>;
}

export default Protected;
