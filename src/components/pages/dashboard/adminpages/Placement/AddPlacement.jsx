import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi"
import NewSidebar from '../../../../Navbar/Navbar';
import "./AddPlacement.css"

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
  NotificationPlacementapi.addplace(cnme,img,mod,nme,year,pack).then(response => {
        alert(response.data.message);
        window.location.href = "/getplacement"
    }).catch((err)=>{
      console.log(err)
    })
}
useEffect(() => {
  return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
    return (
        <>
        <NewSidebar />
        
        <div>
        <div
          className="placementcontainer"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className='Placementform'>
            <h2>Enter Placement Details: </h2>
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
            
            {/* <label>
              {" "}
              Enter Name of Module:
              <input
                type="string"
                value={mod}
                name="Name of Module"
                onChange={(e) => handlemod(e)}
              />
            </label> */}
            {/* <br /> */}
            
            
            
            <label style={{marginRight:'50px'}}>
              {" "}
              Enter Package recieved:
              <input
                type="number"
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
            <label style={{marginRight:'50px'}}>
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
              Image URL:
              <input type="string" onChange={(e) => handleimg(e)} placeholder="Paste Image drive URL"/>
            </label>
            <label style={{marginRight:'90px'}}>
              {" "}
              Enter Module :
              <select value={mod} onChange={(e)=>setmod(e.target.value)} style={{width:'100%'}}>
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
          </form>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button
          type="submit"
          onClick={() => Addplacement()}
          className="btn-place btn-outline-white"
          style={{
            cursor: "pointer",
          marginRight: "150px",
          width: "250px",
          height:'45px',
          borderRadius:'10px'
          }}
        >
          {" "}
          Add Placement{" "}
        </button>
        <button className="btn-place-up" style={{width:'100px', borderRadius:'10px', height:'45px'}}>
          <Link to="/admindashboard">{"  "} Back {"  "}</Link>
        </button></div>
        
        </div>
        </>
    )
}

export default Postplace;