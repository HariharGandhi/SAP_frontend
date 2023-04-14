import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal";
import Adminservice from "../../../../services/admin.service";
const Alluser = (right, a) => {
  const [did, setdid] = useState(0);
  const [stat, setstat] = useState("active");
  const [nme, setnme] = useState("");
  const [ctc, setctc] = useState("");
  //const [num, setnum] = useState("");
  const [mail, setmail] = useState("");
  const [dept, setdept] = useState("");
  const [statt, setstatt] = useState("");
  const [pos, setpos] = useState("");
  const [pass, setpass] = useState(0);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [QueryModal, setQueryModal] = useState(false);
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setQueryModal(false);
  };

  const handleConfirm = () => {
        const st = "inactive"
        Adminservice.delete(st,did).then((res)=>{
          setDeleteModal(false);
          window.location.reload();
        })
  };
  const Modalview = (ele) => {
    setdid(ele.id);
    setDeleteModal(true);
  };

  const Updatedetails = () => {
    axios
      .post(
        `http://localhost:9190/admin/auth/updateAdminUser/${did}`,
        {
            department: dept,
            email: mail,
            mobileNumber: ctc,
            name: nme,
            password: pass,
            position: pos,
            status: statt
        }
      )
      .then((res) => {
        setQueryModal(false);
        window.location.reload();
      });
  };
  const viewQueryModal = (ele) => {
    setdid(ele.id);
    setstat(ele.status);
    setdept(ele.department)
    setmail(ele.email)
    setctc(ele.mobileNumber)
    setnme(ele.name)
    setpass(ele.password)
    setpos(ele.position)
    setQueryModal(true);
  };
  const handlenme = async (event) => {
    setnme(event.target.value);
  };
  const handlectc = async (event) => {
    setctc(event.target.value);
  };
  const handlepass = async (event) => {
    setpass(event.target.value);
  };
  const handlepos = async (event) => {
    setpos(event.target.value);
  };
  const handlemail = async (event) => {
    setmail(event.target.value);
  };
  // const handledept = async (event) => {
  //   setdept(event.target.value);
  // };
  const handlestatt = async (event) => {
    setstatt(event.target.value);
  };
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // const OnDelete = (e) => {
  //   axios.post(`http://localhost:9190/api/deleteapplicationform/${e}`)
  //   .then()
  // }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9190/admin/auth/getAdminUsers/{status}`,{
            params: {
                status: stat
            }
          }
        );
        setData(data);
        //setSid(data.records.student_id);
        console.log(data);
      } catch (error) {
        console.log("Error");
      }
    })();
  },[stat]);

  return (
    <div className="box">
      <div className="table-nav" style={{ display: "block" }}>
        <input
          className="table-search"
          type="text"
          placeholder="Search Your Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="table-drop" name="cars" id="cars" onChange={(e) => setstat(e.target.value)}>
          <option value="">Select Status </option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>{" "}
        <button onClick={()=> setSearch("")}>Clear</button>
        <table>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Id</th>
              <th>Department</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Name</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search) ||
                      item.department.toLowerCase().includes(search) ||
                      item.status.toLowerCase().includes(search) ||
                      item.mobileNumber
                        .toLowerCase()
                        .includes(search) ||
                      item.id.toLowerCase().includes(search) ||
                      item.position.toLowerCase().includes(search);
              })
              .map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.id}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.department}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.email}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.mobileNumber}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.name}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.position}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.status}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      <button
                        style={{ marginRight: "5px" }}
                        onClick={() => viewQueryModal(ele)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
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
        {QueryModal && (
          <Modal>
            <div>
              <h2>Edit details to update :</h2>
              <form>
                <label>
                  {" "}
                  Name: 
                  <input
                    type="string"
                    value={nme}
                    name="Name"
                    onChange={(e) => handlenme(e)}
                  />
                </label>
                <br />
                <label>
                  {" "}
                  Password: 
                  <input
                    type="string"
                    value={pass}
                    name="Password"
                    onChange={(e) => handlepass(e)}
                  />
                </label>
                <br />
                <label style={{marginBottom:'10px'}}>
              {" "}
              Choose department:
              <select value={dept}onChange={(e)=>setdept(e.target.value)} style={{marginLeft:'10px'}}>
                <option value="">Choose department</option>
                <option value="Computer">Computer</option>
                <option value="Mechanical">Mechanical</option>
                <option value="IT">IT</option>
                <option value="Civil">Civil</option>
              </select>
            </label>
            <br />
                <label>
                  {" "}
                  Mobile No.: 
                  <input
                    type="string"
                    value={ctc}
                    name="Mobile No."
                    onChange={(e) => handlectc(e)}
                  />
                </label>
                <br />
                <label>
                  {" "}
                  Email
                  <input
                    type="string"
                    value={mail}
                    name="Email"
                    onChange={(e) => handlemail(e)}
                  />
                </label>
                <br />
                <label>
                  {" "}
                  Position: 
                  <input
                    type="string"
                    value={pos}
                    name="Position"
                    onChange={(e) => handlepos(e)}
                  />
                </label>
                <br />
                <label>
                  {" "}
                  Status: 
                  <input
                    type="string"
                    value={statt}
                    name=" Form Status"
                    onChange={(e) => handlestatt(e)}
                  />
                </label>
                <br />
                <button
                  type="submit"
                  onClick={() => Updatedetails()}
                  className="btn btn-outline-white"
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Update details{" "}
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
          </Modal>
        )}
      </div>
    </div>
  );
};
export default Alluser;
