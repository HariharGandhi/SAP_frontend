import React, { useEffect } from "react";
import Modal from "../../Modal";
import NewSidebar from "../../../../Navbar/Navbar";
import { useState } from "react";
import Axios from "axios";
import { BASE_URL, VERIFIED } from "../../../../../services/Globalvalues";
import "./Getreceipt.css"
//import axios from 'axios';

const Getreceipt = () => {
  const [imgsrc, setimgsrc] = useState("");
  const [Ruid, setRuid] = useState(0);
  const [Rid, setRid] = useState(0);
  const [nodata, setnodata] = useState(false);
  const [inst, setinst] = useState(0);
  const [SAPname, setSAPname] = useState("");
  const [SAPpass, setSAPpass] = useState("");
  const [Modalverify, setModalverify] = useState(false);
  const [receiptverify, setreceiptverify] = useState(false);
  const [success,setsuccess]= useState(false);
  // const ID = parseInt(localStorage.getItem("id"));
  const [Data, setData] = useState([]);
  const handleverify = (ele) => {
    const file = ele.filename;
    setRid(ele.id)
    setRuid(ele.userId)
    setinst(ele.installment)
    Axios.get(BASE_URL + `getfeesreceipt/${file}`, {
      responseType: "blob",
    }).then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setimgsrc(imageUrl);
    });
    setModalverify(true);
  };
  const handleCancel = () => {
    setModalverify(false);
    setreceiptverify(false);
  };
  const handleVerifyfee = () => {
    if(inst === 1){
      setModalverify(false);
      setreceiptverify(true);
    }
    else {
      Axios.post(BASE_URL + `updatefeesreceiptstatus/${Rid}/${VERIFIED}`).then((response)=>{
        setsuccess(true)
    setTimeout(()=>{
      setsuccess(false)
      setreceiptverify(false);
      setModalverify(false);
      window.location.reload()
    },3000)
        
      })
    }
  };
  const handleSname = async (event) => {
    setSAPname(event.target.value);
  };
  const handleSpass = async (event) => {
    setSAPpass(event.target.value);
  };
  const postcred = () => {
   // console.log(SAPname,SAPpass)
    Axios.post(BASE_URL + "postsapcredentialsDetails",{
      sapPassword : SAPpass,
      sapUsername : SAPname,
      userId : Ruid
    }).then(response => {
        Axios.post(BASE_URL + `updatefeesreceiptstatus/${Rid}/${VERIFIED}`).then((res)=>{
        setsuccess(true)
    setTimeout(()=>{
      setsuccess(false);
      setreceiptverify(false);
      window.location.reload()
    },3000)
        })
        
    })
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(BASE_URL + "getReceiptverification");
        setData(data);
        if (Data.length === 0) {
          setnodata(true);
        } else {
          setnodata(false);
        }
      } catch (error) {
      //  console.log(error);
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  },[Data.length]);
  return (
    <>
      <NewSidebar />
      <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "getreceipt vform"
            : "getreceipt"
        }
      >
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr className="main-table top-col-table">
              <th>Student_id</th>
              <th>Installment No.</th>
              <th>Amount of Installment</th>
              <th>Total No.of Installment</th>
              <th>Total Fees</th>
              <th>Status of Verification</th>
              <th>Verify Fee Receipt Image</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          {nodata && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ color: "brown" }}>No data present here</h3>
            </div>
          )}
          {!nodata && (
            <>
          <tbody>
            {Data.map((ele) => {
              return (
                <tr key={ele.id} className="main-table">
                  <td>{ele.userId}</td>
                  <td>{ele.installment}</td>
                  <td>{ele.installmentAmount}</td>
                  <td>{ele.noOfInstallment}</td>
                  <td>{ele.totalFees}</td>
                  <td>{ele.recieptverifyStatus}</td>
                  <td>
                    <button onClick={() => handleverify(ele)}>
                      Check receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody></>)}
        </table>
      </div>

      {Modalverify && (
        <Modal>
          {success && <h3>Credentials Sent to User</h3>}
          {!success && <div className="Receiptget">
            <img
              src={imgsrc}
              alt="Wrongpath"
              style={{ height: "500px", width: "500px" }}
            ></img>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="btn-md"
                onClick={handleVerifyfee}
                style={{
                  marginRight: "100px",
                  marginTop: "10px",
                  height: "25px",
                  width: "50px",
                }}
              >
                Verify
              </button>
              <button
                onClick={handleCancel}
                style={{ marginTop: "10px", height: "25px", width: "50px" }}
              >
                Cancel
              </button>
            </div>
          </div>}
        </Modal>
      )}
      {receiptverify && (
        <>
        <Modal>
        {success && <h3>Credentials Sent to User</h3>}
        {!success && <div className="container">
            <form>
              <label style={{width:'40%', marginRight:'10px'}}>
                Enter SAP Username:
                <input
                  type="string"
                  value={SAPname}
                  name="Username"
                  onChange={(e) => handleSname(e)}
                ></input>
              </label>
              <label style={{width:'40%'}} >
                Enter SAP Password:
                <input
                  type="string"
                  value={SAPpass}
                  name="Password"
                  onChange={(e) => handleSpass(e)}
                ></input>
              </label>
              <br />
    
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="btn-md"
                onClick={() => postcred()}
                style={{
                  marginRight: "100px",
                  marginTop: "10px",
                  height: "50px",
                  width: "100px",
                }}
              >
                Post Credentials
              </button>
              <button
                onClick={handleCancel}
                style={{ marginTop: "10px", height: "25px", width: "50px" }}
              >
                Cancel
              </button>
            </div>
          </div>}
          </Modal>
        </>
      )}
    </>
  );
};

export default Getreceipt;
