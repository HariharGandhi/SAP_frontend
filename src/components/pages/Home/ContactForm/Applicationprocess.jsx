import React from "react";
import "./Applicationprocess.css"
import Navbarforhome from "../Navbarforhome";

const ApplicationProcess = () => {
  return (
    <div className="applyback">
        <Navbarforhome />
    <div className="container apply">
      <h1 className="applyheading">SAP Admission Process</h1>

      <div className="step">
        <h2 className="step-applyheading">1. Admission Enquiry</h2>
      </div>

      <div className="step">
        <h2 className="step-applyheading">
          2. Choose a module (Any one of your choice)
        </h2>
        <p className="sub-applyheading">
          Available modules are ABAP, MM, PP, SD, FICO. For more information, visit
          <a href="https://www.guru99.com/" target="_blank" rel="noopener noreferrer">
            guru99.com
          </a>
        </p>
      </div>

      <div className="step">
        <h2 className="step-applyheading">3. Get login ID and Password for SAP Education</h2>
      </div>

      <div className="step">
        <h2 className="step-applyheading">
          4. Complete 200 hours course on SAP Education (Duration 40 to 50 days)
        </h2>
      </div>

      <div className="step">
        <h2 className="step-applyheading">5. After SAP Education, get access to SAP Logon for hands-on</h2>
        <p className="sub-applyheading">(Duration 15 days)</p>
      </div>

      <div className="step">
        <h2 className="step-applyheading">6. Get SAP Login ID and Password</h2>
        <p className="sub-applyheading">(Duration 15 days)</p>
      </div>

      <div className="step">
        <h2 className="step-applyheading">7. Can go for Global Certification</h2>
      </div>

      <div className="step">
        <h2 className="step-applyheading">
          8. Draft a mail to sap@sanjivani.org.in asking for documents of Global certification.
        </h2>
        <p className="sub-applyheading">
          Kindly mention the following in your email: 
          <br/>
          a. Name: 
          <br/>
          b. Mobile number: 
          <br/>
          c. Pass out year: 
          <br/>
          d. SAP Module: 
          <br/>
          e. Email address: 
          <br/>
          f. Attach fee receipt or screenshot of payment of SAP course.
        </p>
      </div>

      <div className="step">
        <h2 className="step-applyheading">
          9. After document verification by coordinator, your registration will be done to SAP for Global certification.
        </h2>
      </div>

      <div className="step">
        <h2 className="step-applyheading">
          10. You will receive an email after 15 to 20 days from SAP for booking of exam. This exam booking will be valid for 1 year from the date you received an email.
        </h2>
      </div>
    </div></div>
  );
};

export default ApplicationProcess;
