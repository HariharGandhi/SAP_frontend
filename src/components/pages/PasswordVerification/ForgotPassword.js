import React, { Component } from "react"; //, useState -removed
import "./Forgotpassword.css";
import AuthService from "../../../services/auth.service";

class ForgotPassword extends Component {
  state = {
    email: "",
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    const mail = this.state.email;
    sessionStorage.setItem("EMAIL", mail);

    console.log(mail);

    AuthService.forgotpassword(mail)
      .then((res) => {
        console.log(res.data.message);
        sessionStorage.setItem("otp", res.data.message);
        window.location = "/verify"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  render() {
    return (
      <div>
      <div
        className="container"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <form>
          <label>
            {" "}
            Email
            <input
              type="email"
              value={this.state.email}
              name="Email"
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          
        </form>
      </div>
      <button type="submit" onClick={(e) => this.handleSubmit(e)}
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        cursor: "pointer",
      }}>
            {" "}
            Send OTP{" "}
          </button>
      </div>
    );
  }
}
export default ForgotPassword;
