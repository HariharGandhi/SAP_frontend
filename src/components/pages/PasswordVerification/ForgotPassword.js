import React, { Component } from "react"; //, useState -removed
import "./Forgotpassword.css";
import AuthService from "../../../services/auth.service";
import Navbarforhome from "../Home/Navbarforhome";

class ForgotPassword extends Component {
  state = {
    email: "",
    sent : false,
    OTP : "",
    sending: false,
    notsent:true,
    otperr:false
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    const mail = this.state.email;
    sessionStorage.setItem("EMAIL", mail);
    this.setState({
      sending:true
    })
    AuthService.forgotpassword(mail)
      .then((res) => {
        this.setState({
          notsent:false,
          sending:false
        })
        //console.log(res.data.message);
        
        setTimeout(() => {
          this.setState({
            sent:true,
            notsent:true
          })
        }, 3000);
        
        sessionStorage.setItem("otp", res.data.message);
        //window.location = "/verify"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handlelast = () => {
    if (sessionStorage.getItem("otp") === this.state.OTP) {
      sessionStorage.removeItem("otp");
      window.location = "/changepassword";
    } else {
      this.setState({
        otperr:true
      })
    }
  }
  handleChangeOTP = (event) => {
    this.setState({OTP: event.target.value})
  }
  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };
  render() {
    return (
      <div>
      <Navbarforhome />
      {!this.state.sent && <>
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
          </button>
          {this.state.sending && <p style={{color:'Blue',alignSelf:'center'}}>OTP is being sent. Please wait</p>}
          {!this.state.notsent && <p style={{color:'Green',alignSelf:'center'}}>OTP sent to your Email. Please check</p>}
           </>}
          
          {this.state.sent && <>
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
            Enter OTP
            <input
              type="string"
              value={this.state.OTP}
              name="OTP"
              onChange={(e) => this.handleChangeOTP(e)}
            />
          </label>
          {this.state.otperr && <p style={{color:'Red',alignSelf:'center'}}>OTP does not match. Please Re-enter</p>}
        </form>
      </div>
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
