import React, { useEffect } from "react";
import { useState } from "react";
import "./AddNotification.css"
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
const Addnotification = () => {
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
  const Setnotice = async () => {
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
      NotificationPlacementapi.addnotification(bd,cd,cdtm,file,id,nme,nm,stat,title,uid)
        .then((res) => {
          alert("Notification added");
          window.location.href = "/admindashboard";
          //history.push('/adminlogin')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill all the details");
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
  return (
    <div>
      <NewSidebar />
      <div
        className="container notify" id="ADDNotice"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form>
          <h1>Enter the Notification details</h1>
          <br />
          <label>
            {" "}
            Enter id
            <input
              type="long"
              value={id}
              placeholder="Id"
              onChange={(e) => handleid(e)}
            />
          </label>
          
          <label>
            {" "}
            Enter Name
            <input
              type="string"
              value={nme}
              placeholder="Name"
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
              placeholder="notificationmodule"
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
              placeholder="body"
              onChange={(e) => handlebody(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Date and time of creation
            <input
              type="string"
              value={cdtm}
              placeholder="DDMMYYYY-HHMM"
              onChange={(e) => handledatetime(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Code
            <input
              type="string"
              value={cd}
              placeholder="Code"
              onChange={(e) => handlecode(e)}
            />
          </label>
          <label>
            {" "}
            Enter File
            <input
              type="string"
              value={file}
              placeholder="File link (if any)"
              onChange={(e) => handlefile(e)}
            />
          </label>
          
          <br />
          <label>
            {" "}
            Enter Title
            <input
              type="string"
              value={title}
              placeholder="Title"
              onChange={(e) => handletitle(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter Status
            <input
              type="string"
              value={stat}
              placeholder="Status"
              onChange={(e) => handlestatus(e)}
            />
          </label>
          <br />
          <label>
            {" "}
            Enter User Id
            <input
              type="long"
              value={uid}
              placeholder="User Id"
              onChange={(e) => handleuid(e)}
            />
          </label>
          <br />
        </form>
      </div>
      <button
        type="submit"
        onClick={() => Setnotice()}
        className="btn btn-outline-white"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          cursor: "pointer",
        }}
      >
        {" "}
        Add notification{" "}
      </button>
    </div>
  );
};

export default Addnotification;
