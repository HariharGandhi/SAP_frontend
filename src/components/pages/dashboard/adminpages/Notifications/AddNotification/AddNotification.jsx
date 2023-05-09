import React, { useEffect } from "react";
import { useState } from "react";
import "./AddNotification.css";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import { ACTIVE } from "../../../../../../services/Globalvalues";
import { Link } from "react-router-dom";
import SuccessMessage from "../../../Alerts/SuccessMessage";
const Addnotification = () => {
  //const history = useHistory();
  const [nme, setnme] = useState("");
  const [nm, setnm] = useState("");
  const [bd, setbd] = useState("");
  const [cd, setcd] = useState("");
  const [cdtm, setcdtm] = useState("");
  const [Data, setData] = useState([]);
  const [success,setsuccess]= useState(false)
  const [error,seterror] = useState(false)
  // const [stat, setstat] = useState("");
  const [title, settitle] = useState("");
  const [uid, setuid] = useState(0);
  const Setnotice = async () => {
    const file = "NA";
    if (
      nme !== "" &&
      nm !== "" &&
      bd !== "" &&
      cd !== "" &&
      cdtm !== "" &&
      title !== "" &&
      uid !== 0
    ) {
      NotificationPlacementapi.addnotification(
        bd,
        cd,
        cdtm,
        file,
        nme,
        nm,
        ACTIVE,
        title,
        uid
      )
        .then((res) => {
          setsuccess(true)
    setTimeout(()=>{
      setsuccess(false)
    },4000)
          window.location.href = "/getnotification";
          //history.push('/adminlogin')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      seterror(true)
    setTimeout(()=>{
      seterror(false)
    },2000)
    }
  };
  const handlename = async (e) => {
    setnme(e.target.value);
  };

  const handlebody = async (e) => {
    setbd(e.target.value);
    setuid(Number(localStorage.getItem("id")));
  };
  const handlecode = async (e) => {
    setcd(e.target.value);
  };
  // const handledatetime = async (e) => {
  //   setcdtm(e.target.value);
  // };
  const handletitle = async (event) => {
    settitle(event.target.value);
    const date = new Date();
    setcdtm(date.toLocaleString());
  };
  const handlenotifymodule = async (event) => {
    setnm(event.target.value);
  };
  useEffect(() => {
    (async () => {
      const stat = "active";
      try {
        NotificationPlacementapi.getmodules(stat).then((res) => {
          setData(res.data);
        });

        //console.log(Data)
      } catch (error) {
        console.log(error);
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, []);
  return (
    <div>
      <NewSidebar />
      {success && <SuccessMessage message="Notification Added Successfully"/>}
      <div
        className={success ?"container notify load":"container notify"}
        id="ADDNotice"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form>
          <h1>Enter the Notification details</h1>
          {error && <p style={{color:'red',alignSelf:'center',alignContent:'center'}}>Fill all the details</p>}
          <br />
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
            Enter Code
            <input
              type="string"
              value={cd}
              placeholder="Code"
              onChange={(e) => handlecode(e)}
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
            Add Module :
            <select
              className="table-drop"
              name="cars"
              id="cars"
              value={nm}
              onChange={(e) => handlenotifymodule(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select Module</option>
              {Data.map((option) => (
                <option key={option.id} value={option.moduleName}>
                  {option.moduleName}
                </option>
              ))}
            </select>
          </label>
          <br />
          
        </form>
        
      </div>
      
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          type="submit"
          onClick={() => Setnotice()}
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
          <Link to="/getnotification">
            {"  "} Back {"  "}
          </Link>
        </button>
      </div>
      
    </div>
  );
};

export default Addnotification;
