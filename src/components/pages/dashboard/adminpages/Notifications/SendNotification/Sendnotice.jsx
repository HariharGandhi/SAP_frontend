import React, { useEffect } from "react";
import { useState } from "react";
import "./SendNotice.css";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { ACTIVE } from "../../../../../../services/Globalvalues";
const SendNotice = () => {
  //const history = useHistory();
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

  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getmodules(ACTIVE).then((res) => {
          setmodules(res.data);
        });
        //console.log(Data)
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
        try {
          NotificationPlacementapi.getmodules(ACTIVE).then((res) => {
            setmodules(res.data);
          });
          //console.log(Data)
        } catch (error) {
          console.log(error);
        }
      })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, [modules]);
  return (
    <div>
      <NewSidebar />
      <div
        className="container notify"
        id="SENDNotice"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form>
          <h1>Choose the details</h1>
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
          <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          type="submit"
          //onClick={() => Setnotice()}
          className="btn btn-outline-white"
          style={{
            cursor: "pointer",
            marginRight: "400px",
            width: "150px",
            height: "50px",
            borderRadius: "10px",
          }}
        >
          {" "}
          Add notification{" "}
        </button>
        <button
          className="btn btn-outline-white"
          style={{ width: "60px", borderRadius: "10px", height: "50px" }}
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