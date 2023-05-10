import React, { useEffect, useState } from "react";
import "./Application.css";

import Axios from "axios";
import Navbarforapp from "../Home/Navbarforapp";
import { INITIAL, BASE_URL, ACTIVE } from "../../../services/Globalvalues";
import NotificationPlacementapi from "../../../services/NotificationPlacementapi";
import ErrorMessage from "../dashboard/Alerts/ErrorMessage"

const Application = () => {
    const [Mod, setMod] = useState("")
    const [BrancH, setBrancH] = useState("")
    const [time,settime] = useState(false)
    const [studenttype, setstudenttype] = useState("")
    const options = [
      "Computer",
      "Civil",
      "Mechanical",
      "Electrical",
      "Structural",
      "Electronics",
    ];
    const type = [
      "Regular",
      "Outsider",
      "Passout"
    ]
  const [modData, setmodData] = useState([]);
  const submitHandler = (event) => {
    event.preventDefault();
    let userId = localStorage.getItem("id");

    var attributes = {
      adhaarCard: event.target.adhaarCard.value,
      branch: BrancH,
      collegeEmail: event.target.collegeEmail.value,
      contactNumber: event.target.contactNumber.value,
      email: event.target.email.value,
      name: event.target.name.value,
      passoutYear: event.target.passoutYear.value,
      sapModule: Mod,
      specialization: event.target.specialization.value,
      studentType: studenttype,
      applicationFromStatus: INITIAL,
      userId: userId,
    };

    if (
      attributes.adhaarCard !== "" &&
      attributes.branch !== "" &&
      attributes.collegeEmail !== "" &&
      attributes.contactNumber !== null &&
      attributes.email !== "" &&
      attributes.name !== "" &&
      attributes.passoutYear !== 0 &&
      attributes.sapModule !== "" &&
      attributes.specialization !== "" &&
      attributes.studentType !== ""
    ) {
      Axios.post(BASE_URL + "api/applicationForm", attributes)
        .then((response) => {
          //console.log(response);
          //console.log("api is working");
          window.location.href = "/pending";
        })
        .catch((error) => {
          //console.log(error);
        });
    } else {
      settime(true)
      setTimeout(()=>{
        settime(false)
      },2000)
    }
  };
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getmodules(ACTIVE).then((response) => {
          setmodData(response.data);
        });
      } catch (error) {
        //console.log("Error");
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  },[]);

  return (
    <>
      <div>
        <Navbarforapp />
        {time && <ErrorMessage message="Error. Invalid details. Please check again" />}
        <form
          name="sendApplication"
          id="applicationFrom"
          onSubmit={submitHandler}
          className={time ? "load app-form": "app-form"}
        >
          <div className="app-con">
            <div className="app-con-from">
              <h1 className="center ">SAP APPLICATION</h1>
              <div className="app-content">
                <input
                  type="text"
                  placeholder="Enter Your AdharNo "
                  id="adhaarCard"
                />
                <select
                  id="branch"
                  onChange={(e) => setBrancH(e.target.value)}>
                    <option value =""> Select Branch</option>
                    {options.map(ele=>(
                        <option value={ele} key={ele}>{ele}</option>
                    ))}
                  </select>
                {/* <input
                  type="text"
                  placeholder="Enter Your Branch"
                  id="branch"
                /> */}
              </div>
              <div className="app-content">
                <input
                  type="text"
                  placeholder="Enter Your CollageEmail"
                  id="collegeEmail"
                />
                <input
                  type="text"
                  placeholder="Enter Your Contact No"
                  id="contactNumber"
                />
              </div>
              <div className="app-content">
                <input type="text" placeholder="Enter Your Email" id="email" />
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  id="name"
                />
              </div>
              <div className="app-content">
                <input
                  type="text"
                  placeholder="Enter Your Passout Year"
                  id="passoutYear"
                />
                {/* <input
                  type="text"
                  placeholder="Enter your Module"
                  id="sapModule"
                /> */}
                <label>
                  Choose Module:
                  <select
                  id="sapModule"
                  onChange={(e) => setMod(e.target.value)}>
                    <option value =""> Select Module</option>
                    {modData.map(ele=>(
                        <option value={ele.moduleName} key={ele.id}>{ele.moduleName}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="app-content">
                <input
                  type="text"
                  placeholder="Enter your Specialization Fild"
                  id="specialization"
                />
                <select
                  id="studentType"
                  onChange={(e) => setstudenttype(e.target.value)}>
                    <option value =""> Select Student Type</option>
                    {type.map(ele=>(
                        <option value={ele} key={ele}>{ele}</option>
                    ))}
                  </select>
              </div>

              <button className="btn-app">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Application;
