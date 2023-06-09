import React, { useEffect } from "react";
import { useState } from "react";
import "./SendNotice.css";
import NotificationPlacement from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { ACTIVE, BASE_URL } from "../../../../../../services/Globalvalues";

import Axios from "axios";
import SuccessMessage from "../../../Alerts/SuccessMessage";
const SendNotice = () => {
  //const history = useHistory();
  const NId = Number(localStorage.getItem('NoticeId'))
  //const [stype, setstype] = useState([])
  const [success,setsuccess]= useState(false)
  const SType = [
      "Regular",
      "Outsider",
      "Passout"
  ]
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Computer",
    "Civil",
    "Mechanical",
    "Electrical",
    "Structural",
    "Electronics",
  ];
  const handleOptionChange = async (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const [selectedmodules, setSelectedmodules] = useState([]);
  const [modules, setmodules] = useState([])
  const handleModuleChange = async (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedmodules([...selectedmodules, value]);
    } else {
      setSelectedmodules(selectedmodules.filter((option) => option !== value));
    }
  };
  const [selectedstype, setSelectedstype] = useState([]);
  const handleTypeChange = async (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedstype([...selectedstype, value]);
    } else {
      setSelectedstype(selectedstype.filter((option) => option !== value));
    }
  };
  const Sendnotification = () => {
    Axios.post(BASE_URL + "sendNotification",{
      department : selectedOptions,
      modules: selectedmodules,
      studentTypes : selectedstype,
      notificationId : NId
    }).then(res=>{
      setsuccess(true)
    setTimeout(()=>{
      setsuccess(false)
    },4000)
      window.location.href = "/getnotification"
    })
  }
  //const [SType, setSType] = useState([])
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacement.getmodules(ACTIVE).then((res) => {
          setmodules(res.data);
        });
        
      } catch (error) {
      //  console.log(error);
      }
    })();
    
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  },[]);
  return (
    <div>
      <NewSidebar />
      {success && <SuccessMessage message="Notification Sent Successfully"/>}
      <div
        className={success ?"container notify load":"container notify"}
        id="SENDNotice"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form>
          <h2>Choose the details</h2>
          <br />
          <h3 style={{marginBottom:'5px'}}>Choose departments to send :</h3>
          <div className="checkbox-group">
            {options.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleOptionChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{option}</span>
              </label>
            ))}
          </div>
          <hr/>
          <h3 style={{marginBottom:'5px'}}>Choose Modules to send :</h3>
          <div className="checkbox-group">
            {modules.map((mname) => (
              <label key={mname.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={mname.moduleName}
                  checked={selectedmodules.includes(mname.moduleName)}
                  onChange={handleModuleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{mname.moduleName}</span>
              </label>
            ))}
          </div>
          <hr/>
          <h3 style={{marginBottom:'5px'}}>Choose Student category to send :</h3>
          <div className="checkbox-group">
            {SType.map((student) => (
              <label key={student} className="checkbox-label">
                <input
                  type="checkbox"
                  value={student}
                  checked={selectedstype.includes(student)}
                  onChange={handleTypeChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{student}</span>
              </label>
            ))}
          </div>
          <hr/>
          <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          type="submit"
          onClick={() => Sendnotification()}
          className="btn btn-outline-white"
          style={{
            backgroundColor:"black",color:"white",borderRadius:"5px",
            cursor: "pointer",
            marginRight: "400px",
            width: "150px",
            height: "50px",
           
          }}
        >
          {" "}
          Send notification{" "}
        </button>
        <button
          className="btn btn-outline-white"
          style={{backgroundColor:"black",color:"white",borderRadius:"5px", width: "60px", height: "50px" }}
        >
          <Link to="/getnotification" className="linkto">
            {"  "} Back {"  "}
          </Link>
        </button>
      </div>
        </form>
      </div>
      
    </div>
  );
};

export default SendNotice;
