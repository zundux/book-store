import React from "react";

const LoadingLabel = ({ message }) => (
  <div>
    {message || "Loading, please wait"}
  </div>
);

export default LoadingLabel;