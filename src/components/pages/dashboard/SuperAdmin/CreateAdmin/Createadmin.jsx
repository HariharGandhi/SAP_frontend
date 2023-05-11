import React, { useEffect, useState } from 'react';
import Adminapi from '../../../../../services/admin.service';
import NewSidebar from '../../../../Navbar/Navbar';
import { ACTIVE } from '../../../../../services/Globalvalues';
import SuccessMessage from '../../Alerts/SuccessMessage';

const Createadmin = () =>{
  const [dept,setdept] = useState("");
const [nme,setnme] = useState("");
const [pos,setpos] = useState("");
const [pass,setpass] = useState("");
const [mb,setmb] = useState("");
const [success,setsuccess]= useState(false)
const [errors,seterrors]= useState(false)
const [msg,setmsg] = useState("")
const [email,setemail] = useState("");
const handlename = async (e) =>{
    setnme(e.target.value)
}
const handlemobile = async (e) =>{
    setmb(e.target.value)
}
const handlepass = async (e) =>{
    setpass(e.target.value)
}
const handlepos = async (e) =>{
    setpos(e.target.value)
}
const handleemail = async (e) =>{
    setemail(e.target.value)
}

const Addadmin = () => {
    
  Adminapi.Register(dept,email,mb,nme,pass,pos,ACTIVE).then(response => {
      setsuccess(true)
      setTimeout(()=>{
        setsuccess(false)
      },4000)
        window.location.href = "/alladmins"
    }).catch((err)=>{
      seterrors(true)
      setmsg(err.message)
      setTimeout(()=> {
        seterrors(false)
      },2000)
    })
}
useEffect(() => {
  return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
    return (
        <>
        <NewSidebar />
        <div>
        {success && <SuccessMessage message="Admin added Successfully"/>}
        <div
          className={success ? "container load":"container"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form>
            <h1>Enter Admin Details: </h1>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Enter Name
              <input
                type="string"
                value={nme}
                name="Name"
                onChange={(e) => handlename(e)}
              />
            </label>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Choose department:
              <select value={dept} onChange={(e)=>setdept(e.target.value)} style={{marginLeft:'10px'}}>
                <option value="">Choose department</option>
                <option value="Computer">Computer</option>
                <option value="Mechanical">Mechanical</option>
                <option value="IT">IT</option>
                <option value="Civil">Civil</option>
              </select>
            </label>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Enter position:
              <input
                type="string"
                value={pos}
                name="Position"
                onChange={(e) => handlepos(e)}
              />
            </label>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Enter Mobile Number:
              <input
                type="string"
                value={mb}
                name="Mobile Number"
                onChange={(e) => handlemobile(e)}
              />
            </label>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Enter email:
              <input
                type="string"
                value={email}
                name="Email"
                onChange={(e) => handleemail(e)}
              />
            </label>
            <br />
            <label style={{marginBottom:'10px'}}>
              {" "}
              Enter Password
              <input
                type="password"
                value={pass}
                name="Enter Password"
                onChange={(e) => handlepass(e)}
              />
            </label>
            <br />
          </form>
          {errors && <p style={{color:'red'}}>{msg}</p>}
        </div>
        <button
          type="submit"
          onClick={() => Addadmin()}
          className="btn btn-outline-white"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          {" "}
          Add Admin{" "}
        </button>
        </div>
        </>
    )
}

export default Createadmin;