import React, { Component } from "react"; //, useState -removed
import "./Forgotpassword.css";
import AuthService from "../../../services/auth.service";
import Navbarforhome from "../Home/Navbarforhome";

class ForgotPassword extends Component {
  state = {
    email: "",
    sent : false
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    const mail = this.state.email;
    sessionStorage.setItem("EMAIL", mail);
    AuthService.forgotpassword(mail)
      .then((res) => {
        //console.log(res.data.message);
        alert("OTP sent successfully. Please check your Email")
        this.setState({
          sent:true
        })
        sessionStorage.setItem("otp", res.data.message);
        //window.location = "/verify"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handlelast = () => {
    window.location = "/verify"
  }
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  render() {
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
        <form style={{width:'400px'}}>
          <label style={{
          // display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width:'325px'
        }}>
            {" "}
            Enter registered Email:
            <input
              type="email"
              value={this.state.email}
              name="Email"
              onChange={(e) => this.handleChange(e)}
              style={{border:'1px solid'}}
            />
          </label>
          
        </form>
      </div>
      {!this.state.sent && 
      <button type="submit" onClick={(e) => this.handleSubmit(e)}
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        cursor: "pointer",
        width:'100px',
        height:'25px'
      }}>
            {" "}
            <h3>Send OTP</h3>{" "}
          </button>}
          {this.state.sent && <>
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
      <button type="submit" onClick={(e) => this.handleSubmit(e)}
      style={{
        display: "flex",
        justifyContent: "center",
        // margin: "auto",
        marginRight:'20px',
        cursor: "pointer",
        width:'100px',
        height:'25px'
      }}>
            {" "}
            <h3>Resend OTP</h3>{" "}
          </button>
          <button
          style={{
        display: "flex",
        justifyContent: "center",
        //margin: "auto",
        //marginTop: "10px",
        cursor: "pointer",
        width:'100px',
        height:'25px'
      }} onClick={() => this.handlelast()}>
            {" "}
            <h3>Verify </h3>{" "}
          </button></div>
          </>}
      </div>
    );
  }
}
export default ForgotPassword;
