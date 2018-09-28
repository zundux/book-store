import React from "react";

const ErrorLabel = ({ message, onRetry, children }) => (
  <div>
    <p>{message}</p>
    {onRetry && (
      <button className="retry" onClick={onRetry}>Retry</button>
    )}
    {children}
  </div>
);

export default ErrorLabel;