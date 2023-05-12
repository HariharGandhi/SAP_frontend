import React from "react";
import "./Footer.css";

export default function Footer() {
  const newLocal = (
    <a href="/" className="link-1">
      Home
    </a>
  );
  return (
    <div>
      <footer
        className="footer-distributed"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-offset="50"
      >
        <div className="footer-left">
          <h3>
            Sanjivani<span>SAP</span>
          </h3>

          <p className="footer-links">
            {newLocal}

            {/* <a href="#">Blog</a>
				
					<a href="#">Pricing</a> */}

            <a href="/">About</a>

            <a href="/">Faq</a>

            <a href="/">Contact</a>
          </p>

          <p className="footer-company-name">
            Sanjivani College of Engineering,
            <br />
            Kopargaon.
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Station Rd, opposite to Sanjivani Factory,</span>{" "}
              <span> Singnapur, Kopargaon,</span> Maharashtra 423603
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91 9130191301</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:contact@sanjivani.org.in">contact@sanjivani.org.in</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the College</span>
            Sanjivani College of Engineering (An Autonomous Institute),
            Kopargaon is one among the premier technical institutes in
            Maharashtra state in the un-aided sector. Established in 1983 by the
            Sanjivani Rural Educational Society under the charismatic leadership
            of Shri. Shankarrao G. Kolhe, the Institute had its vision for
            social transformation and , upliftment of rural masses through
            education, training and research.
          </p>

          <div className="footer-icons">
            <a href="https://www.facebook.com/profile.php?id=100084731814201&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="https://twitter.com/Sanjivani_Group?s=20" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/sanjivani-sap-student-academy/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            {/* <a href="/">
              <i className="fab fa-github"></i>
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
