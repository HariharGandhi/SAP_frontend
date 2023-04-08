import React, { } from "react";
import NewSidebar from "../../../Navbar/Navbar";
import { useHistory } from "react-router-dom";





const Logindone = () => {
  const history = useHistory();

  const NevigatePayment = () =>{ 
    history.push('/payment')
  }
  const NevigateResume = () =>{ 
    history.push('/resume')
  }

  const NevigateApplicationform = () =>{ 
    history.push('/updateprofile')
  }

  const NevigateCourseDetails = () =>{ 
    history.push('/coursedetails')
  }
  const NevigateTwoWayCommunication = () =>{ 
    history.push('/contacttoadmin')
  }
  const NevigateAdminDetails = () =>{ 
    history.push('/admindetails')
  }
  

  


  return (
    <>
      <NewSidebar />
      <section className="services" id="services">
        <div className="content">
          <div className="title">

          </div>
          <div className="boxes" >
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-duration="2000"
              data-aos-delay="1000"
            >
              <div className="icon">
                <i className="fas fa-desktop"></i>
              </div>
              <div onClick={() => NevigatePayment()} className="topic">ABAP</div>
              <p>
                this is your payment card
              </p>
            </div>
            <div className="box" data-aos="fade-down-right" data-aos-delay="300">
              <div className="icon">
                <i className="fas fa-brush"></i>
              </div>
              <div onClick={() => NevigateResume()} className="topic">MM</div>
              <p>
                tgis is your resume card
              </p>
            </div>
            <div className="box" data-aos="fade-down-right" data-aos-delay="500">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div onClick={() => NevigateApplicationform()} className="topic">PP</div>
              <p>
                this is your application form card
              </p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="100"
              data-aos-offset="120"
            >
              <div className="icon">
                <i className="fab fa-wordpress"></i>
              </div>
              <div onClick={() => NevigateCourseDetails()} className="topic">SD</div>
              <p>
                this is your Course Details card
              </p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="300"
              data-aos-offset="120"
            >
              <div className="icon">
                <i className="fas fa-cloud"></i>
              </div>
              <div onClick={() => NevigateTwoWayCommunication()} className="topic">FICO</div>
              <p>
                2 way communication card
              </p>
            </div>
            <div
              className="box"
              data-aos="fade-down-right"
              data-aos-delay="500"
              data-aos-offset="120"
            >
              <div className="icon">
                <i className="fas fa-tablet-alt"></i>
              </div>
              <div onClick={() => NevigateAdminDetails()} className="topic">HR/HCM </div>
              <p>
                Admin datails card
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Logindone;