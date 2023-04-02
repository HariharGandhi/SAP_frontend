import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi"
//import "./AddPlacement.css"

const AddModule = () =>{
const [mod,setmod] = useState("");
const [nme,setnme] = useState("");

const handlename = async (e) =>{
    setnme(e.target.value)
}
const handlemod = async (e) => {
    setmod(e.target.value)
}
const Stat = "active"
const Addmodule = () => {
  NotificationPlacementapi.addmodules(mod,nme,Stat).then(response => {
        alert(response.data.message);
        window.location.href = "/getmodules"
    }).catch((err)=>{
      console.log(err)
    })
}
useEffect(() => {
  return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
    return (
        <>
        <button className="btn-place-up">
          <Link to="/admindashboard"> Back to Home </Link>
        </button>
        <div>
        <div
          className="modulecontainer"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className='Placementform'>
            <h1>Enter Module Details: </h1>
            <br />
            <label>
              {" "}
              Enter Name of Module:
              <input
                type="string"
                value={nme}
                name="Name of Module"
                onChange={(e) => handlename(e)}
              />
            </label>
            
            <label>
              {" "}
              Enter ShortName of Module:
              <input
                type="string"
                value={mod}
                name="ShortName of Module"
                onChange={(e) => handlemod(e)}
              />
            </label>
          </form>
        </div>
        <button
          type="submit"
          onClick={() => Addmodule()}
          className="btn-place btn-outline-white"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          {" "}
          Add Module{" "}
        </button>{" "}
        
        </div>
        </>
    )
}

export default AddModule;