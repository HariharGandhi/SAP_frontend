import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
import {BASE_URL , ACTIVE } from "../../../../../services/Globalvalues";
import Adminservice from "../../../../../services/admin.service";
import NewSidebar from "../../../../Navbar/Navbar";
//import AdminService from "../../../../../services/admin.service";
//import "./ViewAdmin.css"
const AllAdmin = () => {
  //const [did, setdid] = useState(0);
  const [nme, setnme] = useState("");
  const [ctc, setctc] = useState("");
  
  const [mail, setmail] = useState("");
  const [dept, setdept] = useState("");
  const [statt, setstatt] = useState("");
  const [pos, setpos] = useState("");
  const [pass, setpass] = useState("");
  const [DeleteModal, setDeleteModal] = useState(false);
  const [QueryModal, setQueryModal] = useState(false);
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setQueryModal(false);
  };
  
  
  

  const handleConfirm = () => {
        const st = "inactive"
        const Did = parseInt(sessionStorage.getItem('did'),10)
        Adminservice.update(dept,mail,ctc,nme,pass,pos,st,Did).then((res)=>{
          setDeleteModal(false);
          sessionStorage.removeItem('did')
          window.location.reload();
        })
  };
  const Modalview = (ele) => {
    let did = ele.id;
    sessionStorage.setItem('did',did)
    setDeleteModal(true);
  };

  const Updatedetails = () => {
    const Upid = parseInt(sessionStorage.getItem('did'),10)
    Adminservice.update(dept,mail,ctc,nme,pass,pos,statt,Upid).then((res)=>{
      setDeleteModal(false);
      sessionStorage.removeItem('Upid')
      window.location.reload();
    })
      .then((res) => {
        setQueryModal(false);
        sessionStorage.removeItem('did')
        alert("Upadte successfull")
        window.location.reload();
      });
  };
  const viewQueryModal = (ele) => {
    let did = ele.id;
    sessionStorage.setItem('did',did)
    console.log(sessionStorage.getItem('did'))
    setdept(ele.department)
    setmail(ele.email)
    setctc(ele.mobileNumber)
    setnme(ele.name)
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
  const handledept = async (event) => {
    setdept(event.target.value);
  };
  const handlestatt = async (event) => {
    setstatt(event.target.value);
  };
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const clearsearch =() => {
    setSearch("");
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          BASE_URL + `admin/auth/getAdminUsers/{status}`,{
            params: {
                status: ACTIVE
            }
          }
        );
        // const { data } = AdminService.getadmin(stat)
        setData(data);
        //setSid(data.records.student_id);
        console.log(data);
      } catch (error) {
        console.log("Error");
      }
    })();
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  });

  return (<>
    <NewSidebar />
    <div className="box">
      <div className={sessionStorage.getItem('sidebar')==="true"?"table-nav vform":"table-nav"} style={{ display: "block" }}>
        <input
          className="table-search"
          type="text"
          placeholder="Search Admin Name"
          onChange={(e) => setSearch(e.target.value)}
          style={{border:"1px solid"}}
        />
        {/* <select className="table-drop" name="cars" id="cars" onChange={(e) => setstat(e.target.value)}>
          <option value="">Search by Status </option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>{" "} */}
        <button onClick={()=> clearsearch()} style={{marginLeft:'10px',width:'50px'}}>Clear</button>
        <table style={{width:"100%", marginTop:'20px'}}>
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
                  : item.name.toLowerCase().includes(search) 
              })
              .map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td >
                      {ele.id}
                    </td>
                    <td >
                      {ele.department}
                    </td>
                    <td >
                      {ele.email}
                    </td>
                    <td >
                      {ele.mobileNumber}
                    </td>
                    <td >
                      {ele.name}
                    </td>
                    <td >
                      {ele.position}
                    </td>
                    <td >
                      {ele.status}
                    </td>
                    <td >
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
            <div className="upadmin">
              <h2>Edit details to update :</h2>
              <h6>Rewrite the Password and Status if unchanged</h6>
              <form>
                <label style={{marginRight:"10px"}}>
                  {" "}
                  Name: 
                  <input
                    type="string"
                    value={nme}
                    name="Name"
                    onChange={(e) => handlenme(e)}
                  />
                </label>
                <label>
                  {" "}
                  Password: 
                  <input
                    type="password"
                    value={pass}
                    name="Password"
                    onChange={(e) => handlepass(e)}
                  />
                </label>
                <br />
                <label style={{marginRight:"10px"}}>
                  {" "}
                  Department: 
                  <input
                    type="string"
                    value={dept}
                    name="Department"
                    onChange={(e) => handledept(e)}
                  />
                </label>
                <label style={{marginRight:"10px"}}>
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
                <label style={{marginRight:"10px"}}>
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
                <label style={{marginRight:"10px"}}>
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
                
                <div>
                <button
                  type="submit"
                  onClick={() => Updatedetails()}
                  className=""
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Update details{" "}
                </button>
                <button
                  className=""
                  onClick={handleCancel}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                </div>
                </form>
                </div>
            
          </Modal>
        )}
      </div>
    </div></>
  );
};
export default AllAdmin;
