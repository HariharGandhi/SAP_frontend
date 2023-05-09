import React from 'react';
import "./SuccessMessage.css"
const SuccessMessage = ({ message }) => {
    return (
      <div
        className="SuccessMessage"
      >
        {message}
      </div>
    );
  };
  export default SuccessMessage;