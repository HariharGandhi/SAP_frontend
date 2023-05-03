import React from "react";
import NewSidebar from "../../../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Logindone = () => {
  const history = useHistory();

  const NevigatePayment = () => {
    history.push("/payment");
  };
  const NevigateResume = () => {
    // history.push("/resume");
    // window.location.href = 'http://localhost:3005';
    window.open('http://localhost:3005','_blank')
  };

  const NevigateApplicationform = () => {
    history.push("/updateprofile");
  };

  const NevigateCourseDetails = () => {
    history.push("/coursedetails");
  };
  const NevigateTwoWayCommunication = () => {
    history.push("/contacttoadmin");
  };
  const NevigateAdminDetails = () => {
    history.push("/admindetails");
  };
  useEffect(() => {
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  });

  return (
    <>
      <NewSidebar />
      <section
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "services vform"
            : "services"
        }
        id="services"
      >
        <div className="content">
          <div className="title"></div>
          <div className="boxes">
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-duration="2000"
              data-aos-delay="1000"
              onClick={() => NevigatePayment()}
              style={{ cursor: "pointer" }}
            >
              <div className="icon">
                <i className="fas fa-desktop"></i>
              </div>
              <div className="topic">Payment</div>
              <p>This is your payment Section</p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="300"
              style={{ cursor: "pointer" }}
              onClick={() => NevigateResume()}
            >
              <div className="icon">
                <i className="fas fa-brush"></i>
              </div>
              <div className="topic">Resume</div>
              <p>Create your resume</p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="500"
              style={{ cursor: "pointer" }}
              onClick={() => NevigateApplicationform()}
            >
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="topic">Application Form</div>
              <p>this is your application form card</p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="100"
              data-aos-offset="120"
              style={{ cursor: "pointer" }}
              onClick={() => NevigateCourseDetails()}
            >
              <div className="icon">
                <i className="fab fa-wordpress"></i>
              </div>
              <div className="topic">Course Details</div>
              <p>Course Details card</p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="300"
              data-aos-offset="120"
              style={{ cursor: "pointer" }}
              onClick={() => NevigateTwoWayCommunication()}
            >
              <div className="icon">
                <i className="fas fa-cloud"></i>
              </div>
              <div className="topic">SAP Credentials</div>
              <p>Course credentials after payment verification</p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="500"
              data-aos-offset="120"
              style={{ cursor: "pointer" }}
              onClick={() => NevigateAdminDetails()}
            >
              <div className="icon">
                <i className="fas fa-tablet-alt"></i>
              </div>
              <div className="topic">Admin Details </div>
              <p>Admin datails For Contact</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Logindone;
