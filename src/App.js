import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";
import RoleAuth from "./services/RoleAuth";
import Login from "./components/pages/Login/login.component";
import Register from "./components/pages/Register/register.component";
import Home from "./components/pages/Home/home.component";
// import Domain from "./components/Domain";
// import Footer from "./components/pages/Footer";
// import AcademicCard from "./components/pages/AcademicCard";

import Application from "./components/pages/ApplicationForm/Application";

//import SuperAuth from "./services/SuperAuth";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ForgotPassword from "./components/pages/PasswordVerification/ForgotPassword";
import Verify from "./components/pages/PasswordVerification/Verifypassword";

import Seemoreplacements from "./components/pages/Home/Seemoreplacements";
import Changepassword from "./components/pages/PasswordVerification/Changepassword";
import Addnotification from "./components/pages/dashboard/adminpages/Notifications/AddNotification/AddNotification";
import UpdateNotification from "./components/pages/dashboard/adminpages/Notifications/UpdateNotification/UpdateNotification";
import DeleteNotification from "./components/pages/dashboard/adminpages/Notifications/DeleteNotification/DeleteNotification";
import DeleteFormbyId from "./components/pages/dashboard/adminpages/ApplicationForms/DeleteForm";
import SearchbyStudentId from "./components/pages/dashboard/adminpages/ApplicationForms/SearchForm/SearchbyStudentId";
import GetbyFilter from "./components/pages/dashboard/adminpages/ApplicationForms/GetByFilter/GetbyFilter";
import SearchbyUserId from "./components/pages/dashboard/adminpages/ApplicationForms/SearchForm/SearchbyUserId";
import withAuth from "./services/WithAuth";
import NewNav from "./components/Navbar/NewNav";
import Resume from "./components/pages/dashboard/Studentdashboard/Resume/Resume";
import Pending from "./components/pages/ApplicationForm/Pending";
import ContactForm from "./components/pages/Home/ContactForm/ContactForm";
import contact_form_data from "./components/pages/dashboard/adminpages/Contact_Form_Data/contact_form_data";

//import VerifyForm from "./components/pages/dashboard/adminpages/ApplicationForms/VerifyForm/Verifyform";
// const app = require("express");
// const cors = require("cors")
// app.use(cors());

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* <Route exact path="/logindone" component={Logindone} /> */}
              <Route exact path="/seemore" component={Seemoreplacements} />
              <Route exact path="/application" component={Application} />
              <Route exact path="/ForgotPassword" component={ForgotPassword} />
              <Route exact path="/verify" component={Verify} />
              <Route exact path="/changepassword" component={Changepassword} />
              <Route
                exact
                path="/addnotice"
                component={withAuth(RoleAuth(Addnotification))}
              />
              <Route
                exact
                path="/updatenotice"
                component={withAuth(RoleAuth(UpdateNotification))}
              />
              <Route
                exact
                path="/deletenotice"
                component={withAuth(RoleAuth(DeleteNotification))}
              />
              <Route
                exact
                path="/deleteform"
                component={withAuth(RoleAuth(DeleteFormbyId))}
              />
              <Route
                exact
                path="/searchformbyid"
                component={withAuth(RoleAuth(SearchbyStudentId))}
              />
              <Route
                exact
                path="/searchformbyuid"
                component={withAuth(SearchbyUserId)}
              />
              <Route
                exact
                path="/searchbyfilter"
                component={withAuth(GetbyFilter)}
              />
              <Route path="/newnav" component={NewNav} />
              <Route exact path="/resume" component={Resume} />
              <Route exact path="/pending" component={Pending} />
              <Route exact path="/contactform" component={ContactForm} />
              <Route exact path="/contact_form_data" component={contact_form_data} />

              {/*<Route  path="/VerifyForm" component={VerifyForm} />*/}
            </Switch>
          </div>

          {/* <AcademicCard /> */}
        </div>
      </div>
    );
  }
}

export default App;
