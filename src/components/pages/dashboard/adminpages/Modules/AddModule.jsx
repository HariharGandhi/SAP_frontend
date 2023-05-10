import React, { useEffect, useState } from 'react';
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi"
import { ACTIVE } from '../../../../../services/Globalvalues';
import "./AddModule.css"
import SuccessMessage from '../../Alerts/SuccessMessage';

const AddModule = ({closeModal}) =>{
const [mod,setmod] = useState("");
const [nme,setnme] = useState("");
const [success,setsuccess]= useState(false)
const handlename = async (e) =>{
    setnme(e.target.value)
}
const handlemod = async (e) => {
    setmod(e.target.value)
}

const Addmodule = () => {
  NotificationPlacementapi.addmodules(nme,mod,ACTIVE).then(response => {
    setsuccess(true)
    setTimeout(()=>{
      setsuccess(false)
    },3000)
        window.location.href = "/getmodules"
    }).catch((err)=>{
    //  console.log(err)
    })
}
useEffect(() => {
  return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
    return (
        <>
        <div>
        {success && <SuccessMessage message="Module Added Successfully"/>}
        <div
          className={success ? "modulecontainer load":"modulecontainer"}
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
                style={{border:'1px solid'}}
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
                style={{border:'1px solid'}}
              />
            </label>
          </form>
        </div><div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button
        type="submit"
        onClick={() => Addmodule()}
        className="btn btn-outline-white"
        style={{
          cursor: "pointer",
          marginRight: "200px",
          width: "150px",
          height:'50px',
          borderRadius:'10px'
        }}
      >
        {" "}
        Add notification{" "}
      </button >
      <button className="btn btn-outline-white" style={{cursor: "pointer",width:'60px', borderRadius:'10px', height:'50px'}} onClick={closeModal}>{"  "} Back {"  "}</button></div>
        
        </div>
        </>
    )
}

export default AddModule;