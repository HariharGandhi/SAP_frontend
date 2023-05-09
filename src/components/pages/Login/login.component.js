import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

// import Clglogo from "../../../../public/Photo/Clglogo.jpg";
// import pp from "../../../../public/images/PP.jpeg"
import AuthService from "../../../services/auth.service";
import "../../../root.css";
import Navbarforhome from "../Home/Navbarforhome";
import { INITIAL } from "../../../services/Globalvalues";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();
   
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          const Role = localStorage.getItem('role')
          if(Role==="ROLE_STUDENT"){
          let userId= localStorage.getItem('id');
          AuthService.getApplicationStatus(userId).then(
            (response) => {
              console.log(response);
              if(response==="notfilled"){
                this.props.history.push("/application");
             }
              if(response===INITIAL){
                this.props.history.push("/Pending");
             }
             if(response==="verified"){
               //this.props.history.push("/newnav");
               this.props.history.push("/logindone");
            }
            if(response==="isquery"){
              //this.props.history.push("/newnav");
              this.props.history.push("/isquerytrue");
           }
              window.location.reload();
            });}
            if(Role==="ROLE_ADMIN"){
              this.props.history.push("/admindashboard");
            }
            if(Role==="ROLE_SUPERADMIN"){
              this.props.history.push("/superadmindashboard");
            }
        //  StatuS === "Verifiedd"
        //    ? this.props.history.push("/newnav")
        //    : this.props.history.push("/Application");
          
          // if(localStorage.getItem('role') === 'ROLE_STUDENT'){
          //   this.props.history.push("/newnav");
          //   window.location.reload();
          // }
          // else if (localStorage.getItem('role') === 'ROLE_ADMIN'|| localStorage.getItem('role') === 'ROLE_ADMIN_SUPER') {
          //   this.props.history.push("/newnav");
          //   window.location.reload();
          // }
        },
        
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return ( <>
      <Navbarforhome />
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src={process.env.PUBLIC_URL + "/Photo/Clglogo.jpg"}
            alt="profile-img"
            className="profile-img-card"
//             style={{
//   width: "100px",
//   height: "100px",
//   objectFit: "cover",
//   borderRadius: "50%",
// }}
          />

          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              {/* <label htmlFor="username">Username</label> */}
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
                placeholder="Enter Registered Email"
              />
            </div>

            <div className="form-group">
              {/* <label htmlFor="password"></label> */}
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                placeholder="Enter Your Password"
              />
              <Link to="/Forgotpassword">
                <label className="right-label" style={{ color: "blue" }}>
                  Forget password?
                </label>
              </Link>
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
                style={{ cursor: "pointer" ,backgroundColor:"green"}}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {/* <div>
              <Link to="/home">
                <label className="right-label" style={{ color: "blue" }}>
                  Back to home
                </label>
              </Link>
            </div> */}

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div></>
    );
  }
}
