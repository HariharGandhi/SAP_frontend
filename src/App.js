import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";
import RoleAuth from "./services/RoleAuth";
import Login from "./components/pages/Login/login.component";
import Register from "./components/pages/Register/register.component";
import Home from "./components/pages/Home/home.component";

import Application from "./components/pages/ApplicationForm/Application";
//import Payment from "./components/pages/Payment/Payment";
import SuperAuth from "./services/SuperAuth";
import EventBus from "./common/EventBus";
import ForgotPassword from "./components/pages/PasswordVerification/ForgotPassword";
import Verify from "./components/pages/PasswordVerification/Verifypassword";

import Seemoreplacements from "./components/pages/Home/Seemoreplacements";
import Changepassword from "./components/pages/PasswordVerification/Changepassword";
import Addnotification from "./components/pages/dashboard/adminpages/Notifications/AddNotification/AddNotification";
import UpdateNotification from "./components/pages/dashboard/adminpages/Notifications/UpdateNotification/UpdateNotification";
import DeleteNotification from "./components/pages/dashboard/adminpages/Notifications/DeleteNotification/DeleteNotification";
import DeleteFormbyId from "./components/pages/dashboard/adminpages/ApplicationForms/DeleteForm/DeleteForm";
import SearchbyStudentId from "./components/pages/dashboard/adminpages/ApplicationForms/SearchForm/SearchbyStudentId";
import GetbyFilter from "./components/pages/dashboard/adminpages/ApplicationForms/GetByFilter/GetbyFilter";
import SearchbyUserId from "./components/pages/dashboard/adminpages/ApplicationForms/SearchForm/SearchbyUserId";
import withAuth from "./services/WithAuth";
import NewNav from "./components/Navbar/Navbar";
import Resume from "./components/pages/dashboard/Studentdashboard/Resume/Resume";
import Pending from "./components/pages/ApplicationForm/Pending";
import Logindone from "./components/pages/dashboard/Studentdashboard/logindone.component";
import Getplace from "./components/pages/dashboard/adminpages/Placement/GetPlacement";
import Adminnotification from "./components/pages/dashboard/adminpages/Notifications/GetNotification/AdminNotification";
import Deleteform from "./components/pages/dashboard/adminpages/ApplicationForms/DeleteForm/DeleteForm";
import AdminDashboard from "./components/pages/dashboard/adminpages/Admin Dashboard/AdminDashboard";
import Postplace from "./components/pages/dashboard/adminpages/Placement/AddPlacement";
import AllAdmin from "./components/pages/dashboard/SuperAdmin/ViewAdmin/ViewAdmin";
import Createadmin from "./components/pages/dashboard/SuperAdmin/CreateAdmin/Createadmin";
import Viewform from "./components/pages/dashboard/adminpages/ApplicationForms/Viewform/Viewform";
import VerifyFormmodal from "./components/pages/dashboard/adminpages/ApplicationForms/Verifyformmodal";
import ContactForm from "./components/pages/Home/ContactForm/ContactForm";
import ContactUsTable from "./components/pages/dashboard/adminpages/Contact_Form_Data/contact_form_data";
import SuperAdminDashboard from "./components/pages/dashboard/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
import PostInstallment from "./components/pages/Payment/Fee installments/PostInstallment";
import Isquerytrue from "./components/pages/ApplicationForm/Isquerytrue";
import ApplicationAfterQuery from "./components/pages/ApplicationForm/ApplicationAfterQuery";
// import studenthome from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/studenthome";
// import studenthome from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/studenthome";
// import Profile from "./components/pages/dashboard/Studentdashboard/Profile/profile";
import GetModule from "./components/pages/dashboard/adminpages/Modules/GetModule";
import profile from "./components/pages/dashboard/Studentdashboard/Profile/profile";
import Getinstallments from "./components/pages/Payment/Fee installments/Getinstallments";
import UpdateProfile from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/Six_Card_Pages/UpdateProfile";
// import contactToAdmin from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/Six_Card_Pages/contactToAdmin";

import ContactToAdmin from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/Six_Card_Pages/contactToAdmin";
import SAPfee from "./components/pages/Payment/SAPfee";
import CourseDetails from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/Six_Card_Pages/courseDetails";
import AdminDetails from "./components/pages/dashboard/Studentdashboard/SidebarForStudent/Home/Six_Card_Pages/adminDetails";
import Getfeerazorpay from "./components/pages/Payment/Fee installments/Getfeerazorpay";
import ApplicationProcces from "./components/pages/Home/ContactForm/Applicationprocess";




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
              <Route exact path="/logindone" component={Logindone} />
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
              <Route exact path="/resume" component={withAuth(Resume)} />
              <Route exact path="/pending" component={withAuth(Pending)} />
              <Route
                exact
                path="/getplacement"
                component={withAuth(RoleAuth(Getplace))}
              />
              <Route
                exact
                path="/getnotification"
                component={withAuth(RoleAuth(Adminnotification))}
              />
              <Route
                exact
                path="/admindashboard"
                component={withAuth(RoleAuth(AdminDashboard))}
              />
              <Route
                exact
                path="/deleteform"
                component={withAuth(RoleAuth(Deleteform))}
              />
              <Route
                exact
                path="/allform"
                component={withAuth(RoleAuth(Viewform))}
              />
              <Route
                exact
                path="/postplacement"
                component={withAuth(RoleAuth(Postplace))}
              />
              <Route
                exact
                path="/alladmins"
                component={withAuth(SuperAuth(AllAdmin))}
              />
              <Route
                exact
                path="/addadmin"
                component={withAuth(SuperAuth(Createadmin))}
              />
              <Route
                exact
                path="/verifyform"
                component={withAuth(RoleAuth(VerifyFormmodal))}
              />
              <Route exact path="/payment" component={withAuth(SAPfee)} />
              <Route exact path="/contactus" component={withAuth(ContactForm)} />
              <Route
                exact
                path="/contactformdata"
                component={withAuth(RoleAuth(ContactUsTable))}
              />
              <Route
                exact
                path="/superadmindashboard"
                component={withAuth(SuperAuth(SuperAdminDashboard))}
              />
              <Route
                exact
                path="/postinstallment"
                component={withAuth(RoleAuth(PostInstallment))}
              />
              {/* <Route exact path = "/getinstallment" component={Getinstallments} /> */}
              <Route exact path="/isquerytrue" component={withAuth(Isquerytrue)} />
              <Route
                exact
                path="/applicationafterquery"
                component={withAuth(ApplicationAfterQuery)}
              />
              {/* <Route exact path="/studenthome" component={studenthome} /> */}
              {/* <Route exact path="/profile" component={Profile}/> */}
              <Route exact path="/getmodules" component={withAuth(GetModule)} />
              <Route exact path="/profile" component={withAuth(profile)} />
              <Route exact path="/getinstallment" component={withAuth(Getinstallments)}/>
              <Route exact path="/admindetails" component={withAuth(AdminDetails)}/>
              <Route exact path="/contacttoadmin" component={withAuth(ContactToAdmin)}/>
              <Route exact path="/coursedetails" component={withAuth(CourseDetails)}/>
              <Route exact path="/updateprofile" component={withAuth(UpdateProfile)}/>
              <Route exact path="/applicationprocces" component={withAuth(ApplicationProcces)}/>
              <Route exact path="/collegefee" component={withAuth(Getfeerazorpay)} />
             




            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
