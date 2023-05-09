import React from "react";
import { useState } from "react";
import AuthService from "../../../services/auth.service";
import Navbarforhome from "../Home/Navbarforhome";
import SuccessMessage from "../dashboard/Alerts/SuccessMessage";
import ErrorMessage from "../dashboard/Alerts/ErrorMessage";
const Changepassword = () => {
  
  const [pass, setpass] = useState("");
  const [passn, setpassn] = useState("");
  const mail = sessionStorage.getItem("EMAIL");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [loading, setLoading] = useState(false);
  const Setpassword = async () => {
    if (pass === passn) {
      setIsSuccess(true);
      AuthService.setpassword(mail,passn)
        .then((res) => {
          
          sessionStorage.removeItem("EMAIL");
          setIsSuccess(true);
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/login";
          }, 3000);
          //window.location.href = "/login"
          //window.location = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    }else {
      setisError(true);
      
      setTimeout(() => {
        setLoading(false);
        setisError(false);
      }, 2000);
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
      {!isSuccess && <>
      <div
        className={loading ? "container load":"container"}
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
          height:'50px'
        }}>
            {" "}
            <h3>Change Password</h3>{" "}
          </button> </>}
          {isSuccess && !isError && <SuccessMessage message="Password Set Successfully ! Redirecting to Login Page" />}
          {isError && <ErrorMessage message="Passwords do not match. Re-Enter" />}
    </div>
  );
};

export default Changepassword;
