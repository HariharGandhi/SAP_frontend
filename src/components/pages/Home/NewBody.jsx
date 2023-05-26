import React from "react";
import "./NewBody.css";
// import { useTransition, animated } from "react-spring";
// import { useState, useEffect } from "react";
const NewBody = () => {

  return (
    <div className="new-con">

            <div className="right "  data-aos="fade-down">
             <div className="right-top-n">
            <h2 style={{fontSize:"2.2rem",color:"black"}}>

             Discover The Power of <span className="color-change">SAP</span> 
            </h2>

             </div>
             <div className="right-middle-n">
             Streamline your business processes with our suite of enterprise software solutions. <br/> Register now to access our resources and expertise.
             </div>
             <div className="right-down-n">
              <a  className="b-n-right" href="/register">Register Now</a>
              <button className="b-n-right c-n-right">Learn More</button>

             </div>
            </div>
            <div className="left">
            <div className="left-n-box">
                    <img className="left-n-pic" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" ashdgasjd"/>
                    <br/>
                  
                    <p>Dr.A.B.Pawar</p>
                    <p style={{fontSize:"12px"}}>Dean Of Acadamics</p>

                  </div><div className="left-n-box">
                    <img className="left-n-pic" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" ashdgasjd"/>
                    <br/>
                    
                    <p>Dr.A.B.Pawar</p>
                    <p style={{fontSize:"12px"}}>Dean Of Acadamics</p>

                  </div><div className="left-n-box">
                    <img className="left-n-pic" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" ashdgasjd"/>
                    <br/>
                   
                    <p>Dr.A.B.Pawar</p>
                    <p style={{fontSize:"12px"}}>Dean Of Acadamics</p>

                  </div><div className="left-n-box">
                    <img className="left-n-pic" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" ashdgasjd"/>
                    <br/>
                    <p>Dr.A.B.Pawar</p>
                    <p style={{fontSize:"12px"}}>Dean Of Acadamics</p>

                  </div>
            </div>


    </div>
  );
};

export default NewBody;
