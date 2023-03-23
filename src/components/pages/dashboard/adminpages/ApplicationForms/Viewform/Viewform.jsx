import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../Modal";
import VerifyForm from "../Verifyform";
import "./Viewform.css"

const Viewform = (right, a) => {
  const [did, setdid] = useState(0);
  const [stat, setstat] = useState("");
  const [title, settitle] = useState("");
  const [ctc, setctc] = useState("");
  const [num, setnum] = useState("");
  const [mail, setmail] = useState("");
  const [desc, setdesc] = useState("");
  const [rname, setrname] = useState("");
  const [rdet, setrdet] = useState("");
  const [uid, setuid] = useState(0);
  const [query,setquery] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [VerifyModal, setVerifyModal] = useState(false);
  const [UpdateModal,setUpdateModal] = useState(false)
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setVerifyModal(false);
    setUpdateModal(false);
  };
  const Query = () => {
    setquery(true);
    Addquery()
  }
  const handleConfirm = () => {
    axios
      .delete(`http://localhost:9190/api/deleteapplicationform/${did}`)
      .then((res) => {
        console.log(res);
        setDeleteModal(false);
        window.location.reload();
      });
  };
  const handleVerify = () => {
    setVerifyModal(false);
    setUpdateModal(true);
    
  };
  const handleUpdate = () =>{
    const Uid = localStorage.getItem('Userid')
    console.log(query)
    axios
      .put(
        `http://localhost:9190/api/applicationFormStatusUpdate/${Uid}/${stat}/${query}`
      )
      .then((res) => {
        console.log(query,"new")
        setquery(false)
        setstat("")
        setUpdateModal(false);
        window.location.reload();
      });
  }
  const handleUpdatequery = (q) =>{
    const Uid = localStorage.getItem('Userid')
    //const q = true
    axios
      .put(
        `http://localhost:9190/api/applicationFormStatusUpdate/${Uid}/${stat}/${q}`
      )
      .then((res) => {
        setquery(false)
        setstat("")
        setUpdateModal(false);
        localStorage.removeItem('Userid')
        window.location.reload();
      });
  }
  const clearsearch = () => {
    setSearch("");
    setsearchdept("");
    setsearchmod("")
  }
  const Modalview = (ele) => {
    setdid(ele.id);
    setDeleteModal(true);
  };
  const viewModal = (ele) => {
    const d = ele.id;
    setdid(d);
    localStorage.setItem('Userid',d)
    setstat(ele.applicationFromStatus);
    setmail(ele.email);
    setnum(ele.contactNumber);
    setuid(ele.userId);
    setVerifyModal(true);
  };

  const Addquery = () => {
    axios
      .post(
        `http://localhost:9190/applicationFrom/postapplicationformbyapplicationId/${did}`,
        {
          applicationId: did,
          contactDetails: `Contact no.: ${num}, Email: ${mail}`,
          id: did,
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
        setquery(true)
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
  const [searchmod,setsearchmod] = useState("")
  const [searchdept,setsearchdept] = useState("")
  // const OnDelete = (e) => {
  //   axios.post(`http://localhost:9190/api/deleteapplicationform/${e}`)
  //   .then()
  // }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9190/api/getapplicationform"
        );
        setData(data);
        //setSid(data.records.student_id);
        console.log(data);
      } catch (error) {
        console.log("Error");
      }
    })();
  }, []);
  return (
    <>
      <div className="table-nav">
        <div className="container form-group" id="tab">
        <label>
          Student Name :
          <input
          className="table-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /></label>
        <label>
          Module :
        <input
          className="table-search"
          type="text"
          value={searchmod}
          onChange={(e) => setsearchmod(e.target.value)}
        /></label></div>
        
        <select className="table-drop" value={searchdept} onChange={(e) => setsearchdept(e.target.value)}>
          <option value="">Department</option>
          <option value="comp">Computer</option>
          <option value="it">IT</option>
          <option value="mech">Mechanical</option>
          <option value="ece">ECE</option>
          <option value="civil">Civil</option>
        </select>
        <button onClick={()=> clearsearch()}>Clear</button>
        <table>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Adhar card</th>
              <th>Application status</th>
              <th>Branch</th>
              <th>College Email</th>
              <th>Contact No.</th>
              <th>Email</th>
              <th>Query in Application</th>
              <th>Name</th>
              <th>Passout year</th>
              <th>Sap Module</th>
              <th>Specilization</th>
              <th>Student Type</th>
              <th>Upload img</th>
              <th>Action</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search)
              }).filter((item) => {
                return searchmod.toLowerCase() === ""
                  ? item
                  : item.sapModule.toLowerCase().includes(searchmod)
                }).filter((item) => {
                  return searchdept.toLowerCase() === ""
                    ? item
                    : item.branch.toLowerCase().includes(searchdept)
                  }).map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.adhaarCard}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.applicationFromStatus}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.branch}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.collegeEmail}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.contactNumber}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.email}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.isQueryInApplication?"Yes":"No"}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.name}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.passoutYear}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.sapModule}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.specialization}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.studentType}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.uploadImage}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      <button
                        style={{ marginRight: "5px" }}
                        onClick={() => viewModal(ele)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
                      <button onClick={() => Modalview(ele)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
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
          <Modal style={{justifyContent:'center',display:'flex'}}>
            <VerifyForm />
            <div>
            <button className="btn-md" onClick={handleVerify} style={{marginRight:"50px",cursor:"pointer",width:"100px",height:"25px"}}>Verify</button>
            <button className="btn-md" onClick={handleCancel} style={{cursor:"pointer",width:"100px",height:"25px"}}>Cancel</button>
            </div>
            
          </Modal>
        )}
        {UpdateModal && (
          <Modal>
            <div>
      <div>
              <h2>Change the status of this application to :</h2>
              <dropdown>
                <select name="" id="" onChange={(e) => setstat(e.target.value)}>
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="notverified">Not Verified</option>
                <option value="inquery">In Query</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
              </dropdown>
              {stat==="inquery" && 
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
              </>}
              {stat!=="inquery" && 
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
            </div>}
              
            </div>
      </div>
          </Modal>
        )}
      </div>
    </>
  );
};
export default Viewform;
