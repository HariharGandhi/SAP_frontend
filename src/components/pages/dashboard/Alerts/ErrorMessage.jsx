import React from "react";
import "./ErrorMessage.css"
const ErrorMessage = ({ message }) => {
    return (
      <div
        className="ErrorMessage"
      >
        {message}
      </div>
    );
  };
  export default ErrorMessage;