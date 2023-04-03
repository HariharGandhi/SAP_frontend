import React from "react";
import { useState } from "react";
import AuthService from "../../../services/auth.service";
import Navbarforhome from "../Home/Navbarforhome";
const Changepassword = () => {
  const [pass, setpass] = useState("");
  const [passn, setpassn] = useState("");
  const mail = sessionStorage.getItem("EMAIL");
  const Setpassword = async () => {
    if (pass === passn) {
      AuthService.setpassword(mail,passn)
        .then((res) => {
          alert("New password set succesfully");
          sessionStorage.removeItem("EMAIL");
          window.location.href = "/login"
          //window.location = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      alert("Passwords do not match. Re-Enter");
    }
  };
  const handlepassnew = async (e) => {
    setpassn(e.target.value);
  };
  const handlepassword = async (event) => {
    setpass(event.target.value);
  };

  return (
    <div>
      <Navbarforhome />
      <div
        className="container"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <form style={{ display: "flex", alignContent: "center" }}>
          <label style={{marginTop:'10px'}}>
            {" "}
            Set New Password
            <input
              type="password"
              value={pass}
              name="Password"
              onChange={(e) => handlepassword(e)}
              style={{border:'1px solid'}}
            />
          </label>
          <br />
          <label style={{marginTop:'10px'}}>
            {" "}
            Confirm New Password
            <input
              type="password"
              value={passn}
              name="Password"
              onChange={(e) => handlepassnew(e)}
              style={{border:'1px solid'}}
            />
          </label>
          <br />
          
        </form>
      </div>
      <button type="submit" onClick={() => Setpassword()} 
          style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          cursor: "pointer",
          width:'120px',
          height:'25px'
        }}>
            {" "}
            <h3>Change Password</h3>{" "}
          </button>
    </div>
  );
};

export default Changepassword;
