import React, { Component } from "react"; //, useState - removed
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import authservice from "../../../services/auth.service";
import Navbarforhome from "../Home/Navbarforhome";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vnumber = value => {
  if (value.length !== 10 ) {
    return (
      <div className="alert alert-danger" role="alert">
        Enter Mobile Number without +91
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeconfirm_Password = this.onChangeconfirm_Password.bind(this);


    

    this.state = {
      name: "",
      email: "",
      mobile:"",
      password: "",
      confirm_password: "",
      status:"active",
      successful: false,
      message: "",
      passcheck:false
    };
  }
  

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeconfirm_Password(e) {
    this.setState({
      confirm_password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
      if (this.checkBtn.context._errors.length === 0) {
        if(this.state.password === this.state.confirm_password){
        authservice.register(
          this.state.name,
          this.state.email,
          this.state.mobile,
          this.state.password,
          this.state.status
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
            setTimeout(() => {
              window.location = "/login"
            }, 3000);
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
      else{
      setTimeout(()=> {
        this.setState({
          passcheck:true
        })
      },3000)
      }
    };
  };

    
  

  render() {
    return ( <>
      <Navbarforhome />
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src={process.env.PUBLIC_URL + "/Photo/Clglogo.jpg"}
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangename}
                    validations={[required, vname]}
                    placeholder="Enter Your Name"

                  />
                </div>

                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                    placeholder="Enter Your Email"

                  />
                </div>

                <div className="form-group">
                  <Input
                    type="string"
                    className="form-control"
                    name="number"
                    value={this.state.mobile}
                    onChange={this.onChangeMobile}
                    validations={[required, vnumber]}
                    placeholder="Enter Your Mobile Number"

                  />
                </div>

                <div className="form-group">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                    placeholder="Enter Your Password"

                  />
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    className="form-control mb-40"
                    name="confirm_password"
                    value={this.state.confirm_password}
                    onChange={this.onChangeconfirm_Password}
                    validations={[required, vpassword]}
                    placeholder="Re-enter Your Password"
                  />
                </div>
              {this.state.passcheck && <p style={{color:'red'}}>Password and Confirm Password do not match</p>}
                <div className="form-group and-align">
                  <button className="btn btn-primary btn-block" style={{cursor : "pointer",backgroundColor:"green"}}>Sign Up</button>
                <a href="/">back to home</a>
                </div>
              </div>
            )}

            {this.state.message && (
              <div>
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div><br /><br /><br />
              {this.state.successful && <p>Redirecting to Login Page</p>}
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div> </>
    );
  }
}
