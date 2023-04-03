import React, { useState } from 'react';
import Adminservice from '../../../../../services/admin.service';
import NewSidebar from '../../../../Navbar/Navbar';
import { ACTIVE } from '../../../../../services/Globalvalues';

const Createadmin = () =>{
  const [dept,setdept] = useState("");
const [nme,setnme] = useState("");
const [pos,setpos] = useState("");
const [pass,setpass] = useState("");
const [mb,setmb] = useState("");
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
    
    Adminservice.Register(dept,email,mb,nme,pass,pos,ACTIVE).then(response => {
        alert("Admin added Successfully");
        window.location.href = "/alladmins"
    })
}
    return (
        <>
        <NewSidebar />
        <div>
        <div
          className="container"
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
              <select onChange={(e)=>setdept(e.target.value)} style={{marginLeft:'10px'}}>
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