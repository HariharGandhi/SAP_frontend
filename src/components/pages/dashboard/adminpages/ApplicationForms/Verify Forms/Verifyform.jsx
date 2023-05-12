import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../Modal";
import VerifyFormmodal from "../Verifyformmodal";
import "./Verifyform.css";
import Applicationformapi from "../../../../../../services/applicationformservice";
import PostInstallment from "../../../../Payment/Fee installments/PostInstallment";
import {
  ACTIVE,
  BASE_URL,
  DEPT,
  INITIAL,
} from "../../../../../../services/Globalvalues";
import { CSVLink } from "react-csv";
const VerifyForm = () => {
  const [data, setData] = useState([]);
  const [nodata, setnodata] = useState(false);
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
  const [query, setquery] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [VerifyModal, setVerifyModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [filtered, setfiltered] = useState(false);
  const [search, setSearch] = useState("");
  const [searchmod, setsearchmod] = useState("");
  const [searchdept, setsearchdept] = useState("");
  const [filterData, setfilterData] = useState([]);
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setVerifyModal(false);
    setUpdateModal(false);
  };
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
  ];
  const Query = (e) => {
    e.preventDefault();
    console.log("fghjk");
    setquery(true);
    Addquery();
  };
  const handleConfirm = () => {
    axios.delete(BASE_URL + `api/deleteapplicationform/${did}`).then((res) => {
      setDeleteModal(false);
      window.location.reload();
    });
  };
  const handleVerify = () => {
    setVerifyModal(false);
    setUpdateModal(true);
  };
  const handleUpdate = () => {
    const AId = parseInt(localStorage.getItem("Aid"), 10);

    axios
      .put(BASE_URL + `api/applicationFormStatusUpdate/${AId}/${stat}/${query}`)
      .then((res) => {
        setquery(false);
        setstat("");
        setUpdateModal(false);
        window.location.reload();
      });
  };

  const Modalview = (ele) => {
    setdid(ele.id);
    setDeleteModal(true);
  };
  const viewModal = (ele) => {
    const d = ele.userId;
    setdid(ele.id);
    const Aid = ele.id;
    localStorage.setItem("Aid", Aid);
    localStorage.setItem("Userid", d);
    setstat(ele.applicationFromStatus);
    setmail(ele.email);
    setnum(ele.contactNumber);
    setuid(ele.userId);
    setVerifyModal(true);
  };

  const Addquery = async () => {
    const AId = parseInt(localStorage.getItem("Aid"), 10);
    const Q = true;
    try {
      const res = await axios.put(
        BASE_URL + `api/applicationFormStatusUpdate/${AId}/${stat}/${Q}`
      );
      console.log(res);
      setquery(false);
      setstat("");
      setUpdateModal(false);
      localStorage.removeItem("Userid");
      const postRes = await axios.post(
        BASE_URL + `applicationFrom/postapplicationformbyapplicationId/${did}`,
        {
          applicationId: did,
          contactDetails: `Contact no.: ${num}, Email: ${mail}`,
          id: did,
          isActive: ACTIVE,
          queryDesc: desc,
          queryTitle: title,
          reachoutPersonContactNumber: ctc,
          reachoutPersonDetails: rdet,
          reachoutPersonName: rname,
          userId: uid,
        }
      );
      console.log("post", postRes);
      //window.location.reload();
      //   .then((response)=>{
      //   console.log(response.status)
      //   setquery(true);
      //   handleUpdatequery(true);
      // })
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    setfiltered(true);
    const status = INITIAL;
    Applicationformapi.getfiltered(search, searchmod, searchdept, status).then(
      (res) => {
        setfilterData(res.data.records);
      }
    );
  };
  const clearsearch = () => {
    setSearch("");
    setsearchdept("");
    setsearchmod("");
    setfiltered(false);
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

  useEffect(() => {
    (async () => {
      try {
        const { rec } = await axios.get(
          BASE_URL + "api/fetchlistofApplicationFormbyfilter",
          {
            params: {
              pagenum: 0,
              pagesize: 20,
              email: "",
              studentId: "",
              name: "",
              collegeEmail: "",
              sapModule: "",
              contactNumber: "",
              passoutYear: "",
              branch: "",
              specialization: "",
              studentType: "",
              adhaarCard: "",
              applicationFromStatus: INITIAL,
              uploadImage: "",
              userId: "",
            },
          }
        );

        setData(rec.records);
        if (data.length === 0) {
          setnodata(true);
        } else {
          setnodata(false);
        }
      } catch (error) {
        // console.log(error);
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, [search, searchmod, searchdept, data.length]);

  return (
    <>
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
              style={{ width: "250px" }}
            >
              <option value=""> Select Branch</option>
              {DEPT.map((ele) => (
                <option value={ele} key={ele}>
                  {ele}
                </option>
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
              className="csvbutton"
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "5px",
                width: "80px",
                marginTop: "5",
                marginLeft: "5",cursor:'pointer'
              }}
            >
              {"  "}Search{"  "}
            </button>
            {filtered && (
              <CSVLink
                data={filterData}
                headers={headers}
                filename={"Application form.csv"}
                className="csvbutton"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  marginTop: "5",
                  marginLeft: "5",
                  width: "220px",cursor:'pointer'
                }}
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
                className="csvbutton"
                style={{
                  backgroundColor: "skyblue",
                  color: "black",
                  borderRadius: "5px",
                  marginTop: "5",
                  marginLeft: "5",
                  width: "220px",cursor:'pointer'
                }}
              >
                {" "}
                Download{" "}
              </CSVLink>
            )}
            <button
              onClick={() => clearsearch()}
              className="csvbutton"
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                marginTop: "5",
                marginLeft: "5",
                width: "80px",cursor:'pointer'
              }}
            >
              {" "}
              Clear{" "}
            </button>
          </label>
        </div>
        <table style={{ width: "100%", marginTop: "25px" }} id="tab">
          <thead>
            <tr className="main-table top-col-table">
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
              {/* <th>Payment Info</th> */}
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
              {!filtered && (
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
                            style={{
                              color: "Green",
                              padding: "8px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => viewModal(ele)}
                            title="Verify Form"
                          >
                            <i className="far fa-edit"></i>
                          </button>
                          {"    "}
                          <button
                            onClick={() => Modalview(ele)}
                            title="Delete Form"
                            style={{
                              color: "red",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                        {/* <td>
                      <button
                        onClick={() => viewReceipt(ele)}
                        title="Payment Details"
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      >
                       Receipts <i class='fas fa-receipt'></i>
                      </button>
                      
                    </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              )}
              {filtered && (
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
                            style={{
                              color: "green",
                              padding: "10px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => viewModal(ele)}
                            title="Verify Form"
                          >
                            <i className="far fa-edit"></i>
                          </button>
                          {"    "}
                          <button
                            onClick={() => Modalview(ele)}
                            title="Delete Form"
                            style={{ marginRight: "5px", cursor: "pointer" }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                        <td>
                          {/* <button
                        onClick={() => viewReceipt(ele)}
                        title="Payment Details"
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      >
                       Receipts <i class='fas fa-receipt'></i>
                      </button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </>
          )}
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
          <Modal
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <VerifyFormmodal />
            <div>
              <button
                className="btn-md"
                onClick={handleVerify}
                style={{
                  color: "white",
                  backgroundColor: "green",
                  marginRight: "25px",
                  cursor: "pointer",
                  width: "100px",
                  height: "25px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              >
                Verify Form
              </button>
              {/* <button
                className="btn-md"
                onClick={handleCancel}
                style={{ cursor: "pointer", width: "100px", height: "25px", marginRight: "25px", marginTop:'10px' }}
              >
                Edit Form
              </button> */}
              <button
                className="btn-md"
                onClick={handleCancel}
                style={{
                  color: "white",
                  backgroundColor: "black",
                  cursor: "pointer",
                  width: "100px",
                  height: "25px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
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
                <select name="" id="" onChange={(e) => setstat(e.target.value)}>
                  <option value="">Select status</option>
                  <option value="verified">Verified</option>
                  <option value="notverified">Not Verified</option>
                  <option value="isquery">In Query</option>
                </select>

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
                          onClick={(e) => Query(e)}
                          className="btn btn-outline-white"
                          style={{
                            margin: "auto",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        >
                          {" "}
                          Post Query{" "}
                        </button>
                        <button
                          className="btn btn-outline-white"
                          onClick={handleCancel}
                          style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        >
                          cancel
                        </button>
                      </form>
                    </div>
                  </>
                )}
                {stat === "notverified" && (
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
                      style={{ marginRight: "10px", marginTop: "10px" }}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{ marginTop: "10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {stat === "verified" && (
                  <>
                    <PostInstallment />
                  </>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
export default VerifyForm;
