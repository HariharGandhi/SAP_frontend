import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi"
import { ACTIVE } from '../../../../../services/Globalvalues';
import "./AddModule.css"

const AddModule = () =>{
const [mod,setmod] = useState("");
const [nme,setnme] = useState("");

const handlename = async (e) =>{
    setnme(e.target.value)
}
const handlemod = async (e) => {
    setmod(e.target.value)
}

const Addmodule = () => {
  NotificationPlacementapi.addmodules(nme,mod,ACTIVE).then(response => {
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
        </div><div>
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
        <button className="btn-up">
          <Link to="/admindashboard"> Back to Home </Link>
        </button></div>
        
        </div>
        </>
    )
}

export default AddModule;