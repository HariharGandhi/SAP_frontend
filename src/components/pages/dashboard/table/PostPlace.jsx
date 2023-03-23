import React, { useState } from 'react';
import NotificationPlacementapi from "../../../../services/NotificationPlacementapi"

const Postplace = () =>{
  const [mod,setmod] = useState("");
const [nme,setnme] = useState("");
const [cnme,setcnme] = useState("");
const [pack,setpack] = useState("");
const [year,setyear] = useState("");
const [img,setimg] = useState("");
const handlename = async (e) =>{
    setnme(e.target.value)
}
const handlepackage = async (e) =>{
    setpack(e.target.value)
}
const handlecname = async (e) =>{
    setcnme(e.target.value)
}
const handleyear = async (e) =>{
    setyear(e.target.value)
}
const handleimg = async (e) =>{
    setimg(e.target.value)
}

const Addplacement = () => {
  NotificationPlacementapi.signup(cnme,img,mod,nme,year,pack).then(response => {
        alert(response.message);
        window.location.href = "/"
    })
}
    return (
        <>
        <div>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form>
            <h1>Enter Placement Details: </h1>
            <br />
            <label>
              {" "}
              Enter Name of student:
              <input
                type="string"
                value={nme}
                name="Name of student"
                onChange={(e) => handlename(e)}
              />
            </label>
            <br />
            <label>
              {" "}
              Enter Module :
              <select onChange={(e)=>setmod(e.target.value)}>
                <option value="">Select Module</option>
                <option value="ABAP">ABAP</option>
                <option value="MM">MM</option>
                <option value="PP">PP</option>
                <option value="HR/HCM">HR/HCM</option>
                <option value="FICO">FICO</option>
                <option value="SD">SD</option>
              </select>
            </label>
            <br />
            <label>
              {" "}
              Image :
              <input
                type="string"
                value={img}
                name="URL of Image"
                onChange={(e) => handleimg(e)}
              />
            </label>
            <br />
            <label>
              {" "}
              Enter Company Name:
              <input
                type="string"
                value={cnme}
                name="Company Name"
                onChange={(e) => handlecname(e)}
              />
            </label>
            <br />
            <label>
              {" "}
              Enter Package recieved:
              <input
                type="string"
                value={pack}
                name="Package in LPA"
                onChange={(e) => handlepackage(e)}
              />
            </label>
            <br />
            <label>
              {" "}
              Enter Year of Placement
              <input
                type="string"
                value={year}
                name="Enter Year of Placement"
                onChange={(e) => handleyear(e)}
              />
            </label>
            <br />
          </form>
        </div>
        <button
          type="submit"
          onClick={() => Addplacement()}
          className="btn btn-outline-white"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          {" "}
          Add Placement{" "}
        </button>
        </div>
        </>
    )
}

export default Postplace;