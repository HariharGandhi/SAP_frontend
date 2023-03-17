import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import "../Notifications/Modal.css";
const Verifymodal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  const [stat,setstat] = useState("")
  const handlestatus = async (event) => {
    setstat(event.target.value);
  };

  const FormVerify = () => {
    axios.put(`http://localhost:9090/api/applicationFormStatusUpdate/{ApplicationId}/${stat}`)
    .then((res)=>{
      alert(res + " and Form Verified")
      //window.location.href = "/VerifyForm"
    }
      
    )
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  });

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 100 }}
    >
      <div
        className="modal"
        onClick={props.onClose}
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Verify the form ?</h2>
          </div>
          <div className="modal-body" id="divItem">
            <label>Change Status to :</label>
            <input type="text" name="status" value={stat} onChange={(e) => handlestatus(e)}></input>
          </div>
          <div className="modal-footer">
          <button onClick={()=>FormVerify()} className="button btn-rounded">
                Verify
            </button>
            <button onClick={props.onClose} className="button btn-rounded">
                Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Verifymodal;
