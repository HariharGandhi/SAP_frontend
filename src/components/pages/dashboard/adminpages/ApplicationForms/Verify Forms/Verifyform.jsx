import React ,{ useEffect, useState} from "react";
import axios from "axios";
import Modal from "../../../Modal";
import VerifyFormmodal from "../Verifyformmodal";
import Applicationformservice from "../../../../../../services/applicationformservice";
import PostInstallment from "../../../../Payment/Fee installments/PostInstallment";
const VerifyForm = () => {
    const [data, setData] = useState([]);
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
  const [filterData, setfilterData] = useState([])
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setVerifyModal(false);
    setUpdateModal(false);
  };
  const Query = () => {
    setquery(true);
    Addquery();
  };
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
  const handleUpdate = () => {
    const Uid = localStorage.getItem("Userid");
    console.log(query);
    axios
      .put(
        `http://localhost:9190/api/applicationFormStatusUpdate/${Uid}/${stat}/${query}`
      )
      .then((res) => {
        console.log(query, "new");
        setquery(false);
        setstat("");
        setUpdateModal(false);
        window.location.reload();
      });
  };
  const handleUpdatequery = (q) => {
    const Uid = localStorage.getItem("Userid");
    //const q = true
    axios
      .put(
        `http://localhost:9190/api/applicationFormStatusUpdate/${Uid}/${stat}/${q}`
      )
      .then((res) => {
        setquery(false);
        setstat("");
        setUpdateModal(false);
        localStorage.removeItem("Userid");
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
    localStorage.setItem("Aid",Aid)
    localStorage.setItem("Userid", d);
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
        setquery(true);
        handleUpdatequery(true);
      });
  };
  const handleSearch = () => {
    setfiltered(true)
    const status = "initial"
    Applicationformservice.getfiltered(search,searchmod,searchdept,status)
    .then((res)=> {
      setfilterData(res.data.records);
    })
  }
  const clearsearch = () => {
    setSearch("");
    setsearchdept("");
    setsearchmod("");
    setfiltered(false)
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
            const { data } = await axios.get("http://localhost:9190/api/fetchlistofApplicationFormbyfilter",{
                params: {
                    pagenum : 0,
                    pagesize : 20,
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
                    applicationFromStatus: "initial",
                    uploadImage: "",
                    userId: ""
      
                }
            });
            
            setData(data.records);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        })();
        return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
      }, [search,searchmod,searchdept]);

    return (
        <>
      <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        id="tab"
      >
        <div className="container form-group " id="tab">
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
              style={{width:'250px'}}
            >
              <option value="">Department</option>
              <option value="comp">Computer</option>
              <option value="it">IT</option>
              <option value="mech">Mechanical</option>
              <option value="ece">ECE</option>
              <option value="civil">Civil</option>
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
              style={{ width: "90px", marginLeft: "20px" }}
            >
              Search
            </button>
            <button
              onClick={() => clearsearch()}
              style={{ width: "90px", marginLeft: "20px" }}
            >
              Clear
            </button>
          </label>
        </div>
        <table style={{ width: "100%", marginTop: "25px" }}>
          <thead>
            <tr className="main-table top-col-table" id="tab">
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
          {!filtered && 
          <tbody>
            {data.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td>{ele.adhaarCard}</td>
                    <td>{ele.applicationFromStatus}</td>
                    <td>{ele.branch}</td>
                    <td>{ele.collegeEmail}</td>
                    <td>{ele.contactNumber}</td>
                    <td>{ele.email}</td>
                    <td>{ele.isQueryInApplication ? "Yes" : "No"}</td>
                    <td>{ele.name}</td>
                    <td>{ele.passoutYear}</td>
                    <td>{ele.sapModule}</td>
                    <td>{ele.specialization}</td>
                    <td>{ele.studentType}</td>
                    <td>{ele.uploadImage}</td>
                    <td>
                      <button
                        style={{ marginRight: "5px", cursor: "pointer" }}
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
                    <td>{ele.collegeEmail}</td>
                    <td>{ele.contactNumber}</td>
                    <td>{ele.email}</td>
                    <td>{ele.isQueryInApplication ? "Yes" : "No"}</td>
                    <td>{ele.name}</td>
                    <td>{ele.passoutYear}</td>
                    <td>{ele.sapModule}</td>
                    <td>{ele.specialization}</td>
                    <td>{ele.studentType}</td>
                    <td>{ele.uploadImage}</td>
                    <td>
                      <button
                        style={{ marginRight: "5px", cursor: "pointer" }}
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
            <VerifyFormmodal />
             <div  > 
              <button
                className="btn-md"
                onClick={handleVerify}
                style={{
                  marginRight: "25px",
                  cursor: "pointer",
                  width: "100px",
                  height: "25px",
                }}
              >
                Verify Form
              </button>
              <button
                className="btn-md"
                onClick={handleCancel}
                style={{ cursor: "pointer", width: "100px", height: "25px", marginRight: "25px", }}
              >
                Edit Form
              </button>
              <button
                className="btn-md"
                onClick={handleCancel}
                style={{ cursor: "pointer", width: "100px", height: "25px" }}
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
                    <option value="not verified">Not Verified</option>
                    <option value="inquery">In Query</option>
                  </select>
                </dropdown>
                {stat === "inquery" && (
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
                {stat === "not verified" && (
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
      </div>
    </>
    )

}
export default VerifyForm;