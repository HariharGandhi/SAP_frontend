import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../Modal";
import VerifyFormmodal from "../Verifyformmodal";
import "./Viewform.css";
import Applicationformapi from "../../../../../../services/applicationformservice";
import NewSidebar from "../../../../../Navbar/Navbar";
import PostInstallment from "../../../../Payment/Fee installments/PostInstallment";
import {BASE_URL, DEPT} from "../../../../../../services/Globalvalues";
import { CSVLink } from "react-csv";
import Axios from "axios";

const Viewform = () => {
  const [did, setdid] = useState(0);
  const [stat, setstat] = useState("");
  const [title, settitle] = useState("");
  const [ctc, setctc] = useState("");
  const [num, setnum] = useState("");
  const [mail, setmail] = useState("");
  const [desc, setdesc] = useState("");
  const [rname, setrname] = useState("");
  const [imgsrc, setimgsrc] = useState("")
  const [rdet, setrdet] = useState("");
  const [uid, setuid] = useState(0);
  const [query, setquery] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [VerifyModal, setVerifyModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [PaymentModal, setPaymentModal] = useState(false);
  const [Modalverify, setModalverify] = useState(false);
  const [Receiptdata, setReceiptdata] = useState([])
  const [filtered, setfiltered] = useState(false);
  const [filterData, setfilterData] = useState([])
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setVerifyModal(false);
    setUpdateModal(false);
    setPaymentModal(false);
  };
  const handleCancelModal = () => {
    // hide confirmation modal
    setModalverify(false);
    setPaymentModal(true);
  };
  const Query = () => {
    setquery(true);
    Addquery();
  };
  const viewReceipt = (ele) => {
    const ID = ele.userId;
    Axios.get(BASE_URL + `getReceiptByuserId/${ID}`).then((res)=>{
      setReceiptdata(res.data)
    })
    setPaymentModal(true)
  }
  const receiptImage = (ele) => {
    const fname = ele.filename
    Axios.get(BASE_URL + `getfeesreceipt/${fname}`, {
      responseType: "blob",
    }).then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setimgsrc(imageUrl);
    });
    setPaymentModal(false)
    setModalverify(true)
  }
  const headers = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "AdhaarCard", key: "adhaarCard" },
    { label: "Form Status", key: "applicationFromStatus" },
    { label: "Branch", key: "branch" },
    { label: "College Email", key: "collegeEmail" },
    { label: "Contact", key: "contactNumber" },
    { label: "Email", key: "email" },
    { label: "Query in Application", key: "isQueryInApplication" },
    { label: "Year of passout", key: "passoutYear" },
    { label: "Module", key: "sapModule" },
    { label: "Specialization", key: "specialization" },
    { label: "StudentType", key: "studentType" },
  ]

  const handleConfirm = () => {
    axios
      .delete(BASE_URL + `api/deleteapplicationform/${did}`)
      .then((res) => {
        setDeleteModal(false);
        window.location.reload();
      });
  };
  const handleVerify = () => {
    setVerifyModal(false);
    setUpdateModal(true);
  };
  const handleUpdate = () => {
    const AId = parseInt(localStorage.getItem("Aid"),10);
  
    axios
      .put(
        BASE_URL + `api/applicationFormStatusUpdate/${AId}/${stat}/${query}`
      )
      .then((res) => {
      
        setquery(false);
        setstat("");
        setUpdateModal(false);
        window.location.reload();
      });
  };
  const handleUpdatequery = (q) => {
    const AId = parseInt(localStorage.getItem("Aid"),10);
    //const q = true
    axios
      .put(
        BASE_URL + `api/applicationFormStatusUpdate/${AId}/${stat}/${q}`
      )
      .then((res) => {
        setquery(false);
        setstat("");
        setUpdateModal(false);
        localStorage.removeItem("Userid");
        window.location.reload();
      });
  };
  const handleSearch = () => {
    setfiltered(true)
    const status = ""
    Applicationformapi.getfiltered(search,searchmod,searchdept,status)
    .then((res)=> {
      setfilterData(res.data.records);
      return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
    })
  }
  const clearsearch = () => {
    setSearch("");
    setsearchdept("");
    setsearchmod("");
    setfiltered(false)
  };
  const Modalview = (ele) => {
    setdid(ele.id);
    setDeleteModal(true);
  };
  const viewModal = (ele) => {
    const d = ele.userId;
    setdid(d);
    const Aid = ele.id;
    localStorage.setItem("Aid",Aid)
    localStorage.setItem("Userid", d);
    setstat(ele.applicationFromStatus);
    setmail(ele.email);
    setnum(ele.contactNumber);
    setuid(ele.userId);
    setVerifyModal(true);
  };

  const Addquery = () => {
    const AId = parseInt(localStorage.getItem("Aid"),10);
    axios
      .post(
        BASE_URL + `applicationFrom/postapplicationformbyapplicationId/${AId}`,
        {
          applicationId: AId,
          contactDetails: `Contact no.: ${num}, Email: ${mail}`,
          isActive: stat,
          queryDesc: desc,
          queryTitle: title,
          reachoutPersonContactNumber: ctc,
          reachoutPersonDetails: rdet,
          reachoutPersonName: rname,
          userId: uid,
        }
      )
      .then((res) => {
        setquery(true);
        handleUpdatequery(true);
      });
  };
  const handletitle = async (event) => {
    settitle(event.target.value);
  };
  const handlectc = async (event) => {
    setctc(event.target.value);
  };
  const handlername = async (event) => {
    setrname(event.target.value);
  };
  const handlerdet = async (event) => {
    setrdet(event.target.value);
  };
  const handledesc = async (event) => {
    setdesc(event.target.value);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchmod, setsearchmod] = useState("");
  const [searchdept, setsearchdept] = useState("");
  useEffect(() => {
    (async () => {
      try {
         const { data } = await Applicationformapi.getallforms();
        setData(data);
      
      } catch (error) {
       // console.log("Error");
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, []);
  return (
    <>
      <NewSidebar />
      <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        // id="tab"
      >
        <div className="container form-group " id="vfcont">
          <label>
            Student Name :
            <input
              className="table-search"
              type="text"
              value={search}
              placeholder="Enter Name to search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
                  className="table-drop"
                  value={searchdept}
                  onChange={(e) => setsearchdept(e.target.value)}
                  style={{width:'250px'}}>
                    <option value =""> Select Branch</option>
                    {DEPT.map(ele=>(
                        <option value={ele} key={ele}>{ele}</option>
                    ))}
                  </select>
          </label>
          <label>
            Module :
            <input
              className="table-search"
              type="text"
              value={searchmod}
              placeholder="Enter module to search"
              onChange={(e) => setsearchmod(e.target.value)}
              style={{ marginLeft: "60px" }}
            />
            <button
              onClick={() => handleSearch()}
              // className="xlsbutton"
              style={{color:"white",backgroundColor:"black",padding:"5px",borderRadius:"5px",width:"100"}}
            >
              Search
            </button>
            {filtered && (
          <CSVLink
            data={filterData}
            headers={headers}
            filename={"Application form.csv"}
            className="xlsbutton"
            style={{ marginTop: "5", marginLeft: "5" ,backgroundColor:"skyblue",color:"white",borderRadius:"5px"}}
          >
            {" "}
            Download{" "}
          </CSVLink>
        )}
        {!filtered && (
          <CSVLink
            data={data}
            headers={headers}
            filename={"Application form.csv"}
            // className="xlsbutton"
            style={{ marginTop: "5", marginLeft: "10px" ,backgroundColor:"skyblue",padding:"5px",color:"black",borderRadius:"5px"}}
          >
            {" "}
            Download{" "}
          </CSVLink>
        )}
            <button
              onClick={() => clearsearch()}
              // className="xlsbutton"
              style={{color:"white",backgroundColor:"red",marginLeft:"10px",padding:"5px",width:"50px",borderRadius:"5px"}}
            >
              Clear
            </button>
          </label>
        </div>
        <table style={{  marginTop: "25px" }} id="tab">
          <thead>
            <tr className="main-table top-col-table" >
              {/*<th>Student_id</th>*/}
              <th>Adhar card</th>
              <th>Application status</th>
              <th>Branch</th>
              {/* <th>College Email</th> */}
              <th>Contact No.</th>
              <th>Email</th>
              <th>Query in Application</th>
              <th>Name</th>
              <th>Passout year</th>
              <th>Sap Module</th>
              <th>Specilization</th>
              <th>Student Type</th>
              {/* <th>Upload img</th> */}
              <th>Action</th>
              <th>Payment Info</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          {!filtered && 
          <tbody>
            {data.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td>{ele.adhaarCard}</td>
                    <td>{ele.applicationFromStatus}</td>
                    <td>{ele.branch}</td>
                    {/* <td>{ele.collegeEmail}</td> */}
                    <td>{ele.contactNumber}</td>
                    <td>{ele.email}</td>
                    <td>{ele.isQueryInApplication ? "Yes" : "No"}</td>
                    <td>{ele.name}</td>
                    <td>{ele.passoutYear}</td>
                    <td>{ele.sapModule}</td>
                    <td>{ele.specialization}</td>
                    <td>{ele.studentType}</td>
                    {/* <td>{ele.uploadImage}</td> */}
                    <td>
                      <button
                        style={{ color:"green", marginRight: "5px", cursor: "pointer" }}
                        onClick={() => viewModal(ele)}
                        title="Verify Form"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
                      <button
                        onClick={() => Modalview(ele)}
                        title="Delete Form"
                        style={{color:"red", marginRight: "5px", cursor: "pointer" }}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => viewReceipt(ele)}
                        title="Payment Details"
                        style={{ color:"white",backgroundColor:"green", marginRight: "5px", cursor: "pointer" }}
                      >
                       Receipts
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>}
          {filtered && 
          <tbody>
            {filterData.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td>{ele.adhaarCard}</td>
                    <td>{ele.applicationFromStatus}</td>
                    <td>{ele.branch}</td>
                    {/* <td>{ele.collegeEmail}</td> */}
                    <td>{ele.contactNumber}</td>
                    <td>{ele.email}</td>
                    <td>{ele.isQueryInApplication ? "Yes" : "No"}</td>
                    <td>{ele.name}</td>
                    <td>{ele.passoutYear}</td>
                    <td>{ele.sapModule}</td>
                    <td>{ele.specialization}</td>
                    <td>{ele.studentType}</td>
                    {/* <td>{ele.uploadImage}</td> */}
                    <td>
                      <button
                        style={{color:"white",backgroundColor:"green", marginRight: "5px", cursor: "pointer", marginTop:'5px' }}
                        onClick={() => viewModal(ele)}
                        title="Verify Form"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
                      <button
                        onClick={() => Modalview(ele)}
                        title="Delete Form"
                        style={{ marginRight: "5px", cursor: "pointer" , marginTop:'5px'}}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => viewReceipt(ele)}
                        title="Payment Details"
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      >
                       Receipts
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>}
        </table>
        {DeleteModal && (
          <Modal>
            <div>
              <h2>Are you sure you want to delete?</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <button
                  className="btn-md"
                  onClick={handleConfirm}
                  style={{ marginRight: "10px" }}
                >
                  Yes
                </button>
                <button onClick={handleCancel}>No</button>
              </div>
            </div>
          </Modal>
        )}
        {VerifyModal && (
          <Modal style={{ justifyContent: "center", display: "flex",alignItems:"center" }}>
            <VerifyFormmodal style={{justifyContent: "center", display: "flex",alignItems:"center",margin:"auto"}}/>
            <div style={{justifyContent: "center", display: "flex",alignItems:"center"}}>
              <button
                className="btn-md"
                onClick={handleVerify}
                style={{
                  color:"white",
                  backgroundColor:"green",
                  marginRight: "20px",
                  cursor: "pointer",
                  width: "100px",
                  height: "25px", 
                  marginTop:'10px',
                  borderRadius :"5px"
                }}
              >
                Verify
              </button>
              <button
                className="btn-md"
                onClick={handleCancel}
                style={{color:"white", backgroundColor:"black", cursor: "pointer",borderRadius :"5px", width: "100px", height: "25px" , marginTop:'10px'}}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        {UpdateModal && (
          <Modal>
            <div>
              <div>
                <h2>Change the status of this application to :</h2>
                <dropdown>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setstat(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="verified">Verified</option>
                    <option value="notverified">Not Verified</option>
                    <option value="isquery">In Query</option>
                  </select>
                </dropdown>
                {stat === "isquery" && (
                  <>
                    <div>
                      <h2>Enter Query details: </h2>
                      <form>
                        <label>
                          {" "}
                          Enter Query Title
                          <input
                            type="string"
                            value={title}
                            name="Title"
                            onChange={(e) => handletitle(e)}
                          />
                        </label>
                        <br />
                        <label>
                          {" "}
                          Enter Query Description
                          <input
                            type="string"
                            value={desc}
                            name="Description"
                            onChange={(e) => handledesc(e)}
                          />
                        </label>
                        <br />
                        <label>
                          {" "}
                          Enter Name of faculty to Reachout:
                          <input
                            type="string"
                            value={rname}
                            name="Name of faculty"
                            onChange={(e) => handlername(e)}
                          />
                        </label>
                        <br />
                        <label>
                          {" "}
                          Enter Faculty details:
                          <input
                            type="string"
                            value={rdet}
                            name="Faculty designation"
                            onChange={(e) => handlerdet(e)}
                          />
                        </label>
                        <br />
                        <label>
                          {" "}
                          Enter Contact no. of Faculty:
                          <input
                            type="string"
                            value={ctc}
                            name="Contact"
                            onChange={(e) => handlectc(e)}
                          />
                        </label>
                        <br />
                        <button
                          type="submit"
                          onClick={() => Query()}
                          className="btn btn-outline-white"
                          style={{
                            margin: "auto",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          Post Query{" "}
                        </button>
                        <button
                          className="btn btn-outline-white"
                          onClick={handleCancel}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        >
                          cancel
                        </button>
                      </form>
                    </div>
                  </>
                )}
                {(stat === "notverified") && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "right",
                    }}
                  >
                    <button
                      className="btn-md"
                      onClick={handleUpdate}
                      style={{ marginRight: "10px" }}
                    >
                      Update
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                )}
                {stat === "verified" && <>
                  <PostInstallment />
                  </>}
              </div>
            </div>
          </Modal>
        )}
        {PaymentModal && <>
        <Modal>
          <table id='placetab' className="getplace">
            <thead className="main-table top-col-table">
            <tr>
            <th>Payment Installment Id</th>
            <th>Status of Payment</th>
            <th>Uploaded Receipt</th>
            </tr>
            </thead>
            <tbody>
              {Receiptdata.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.paymentInstallmentId}</td>
                    <td>{ele.recieptverifyStatus}</td>
                    <td><button onClick={() => receiptImage(ele)}>
                        View Receipt
                      </button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button onClick={handleCancel}>Cancel</button>
        </Modal>
        </>}
        {Modalverify && (
        <Modal>
       <div className="Receiptget">
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
              {/* <button
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
              </button> */}
              <button
                onClick={handleCancelModal}
                style={{ marginTop: "10px", height: "25px", width: "50px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      </div>
    </>
  );
};
export default Viewform;
