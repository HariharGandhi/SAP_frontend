import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./UpdateNotification.css"
//import { useHistory } from 'react-router-dom';
const UpdateNotification = () => {
  //const history = useHistory();
  const [nme, setnme] = useState("");
  const [id, setid] = useState(0);
  const [nm, setnm] = useState("");
  const [bd, setbd] = useState("");
  const [cd, setcd] = useState("");
  const [cdtm, setcdtm] = useState("");
  const [file, setfile] = useState("");
  const [stat, setstat] = useState("");
  const [title, settitle] = useState("");
  const [uid, setuid] = useState(0);
  
  const updatenotice = async () => {
    if (
      nme !== "" &&
      nm !== "" &&
      bd !== "" &&
      cd !== "" &&
      cdtm !== "" &&
      file !== "" &&
      stat !== "" &&
      title !== "" &&
      uid !== 0 &&
      id !== 0
    ) {
      await axios
        .post(`http://localhost:9190/updateNotification/${id}`, {
          body: bd,
          code: cd,
          createdDateTime: cdtm,
          file: file,
          id: id,
          name: nme,
          notificationmodule: nm,
          status: stat,
          title: title,
          userId: uid,
        })
        .then((res) => {
          
          window.location.href = "/adminlogin";
        })
        .catch((err) => {
        //  console.log(err);
        });
    } else {
    }
  };
  const handlename = async (e) => {
    setnme(e.target.value);
  };
  const handleuid = async (e) => {
    setuid(e.target.value);
  };
  const handlefile = async (e) => {
    setfile(e.target.value);
  };
  const handlestatus = async (e) => {
    setstat(e.target.value);
  };
  const handlebody = async (e) => {
    setbd(e.target.value);
  };
  const handleid = async (e) => {
    setid(e.target.value);
  };
  const handlecode = async (e) => {
    setcd(e.target.value);
  };
  const handledatetime = async (e) => {
    setcdtm(e.target.value);
  };
  const handletitle = async (event) => {
    settitle(event.target.value);
  };
  const handlenotifymodule = async (event) => {
    setnm(event.target.value);
  };
  useEffect(() => {
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  });


  useEffect(() => {
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  });

  return (
    <div >
      <div
        className="container" id="UpdateNotice"
        style={{ display: "flex", justifyContent: "center" }} 
      >
        <form >
          <h6>Enter the details to update</h6>
          
          <label>
            {" "}
            Enter id
            <input
              type="integer"
              value={id}
              name="Id"
              onChange={(e) => handleid(e)}
            />
          </label>
          <br />
          <br /><br />
          <label>
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
          <label>
            {" "}
            Enter Notification Module
            <input
              type="string"
              value={nm}
              name="notificationmodule"
              onChange={(e) => handlenotifymodule(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Body of Notification
            <input
              type="string"
              value={bd}
              name="body"
              onChange={(e) => handlebody(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Code
            <input
              type="string"
              value={cd}
              name="Code"
              onChange={(e) => handlecode(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Date and time of creation
            <input
              type="string"
              value={cdtm}
              name="createdDateTime"
              onChange={(e) => handledatetime(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter File
            <input
              type="string"
              value={file}
              name="File"
              onChange={(e) => handlefile(e)}
            />
          </label>
          <br /><br /><br />
          <label>
            {" "}
            Enter Title
            <input
              type="string"
              value={title}
              name="Title"
              onChange={(e) => handletitle(e)}
            />
          </label>
          <br /><br />
          <label>
            {" "}
            Enter Status
            <input
              type="string"
              value={stat}
              name="Status"
              onChange={(e) => handlestatus(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter User Id
            <input
              type="integer"
              value={uid}
              name="User Id"
              onChange={(e) => handleuid(e)}
            />
          </label>
          <br />
        </form>
      </div>
      <button
        type="submit"
        onClick={() => updatenotice()}
        className="btn btn-outline-white"
        style={{backgroundColor:"black",color:"white",borderRadius:"5px", display: "flex", justifyContent: "center", margin: "auto", marginBottom:'10px' }}
        id="UpdateNotice"
      >
        {" "}
        Update notification{" "}
      </button>
    </div>
  );
};

export default UpdateNotification;
