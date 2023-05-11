import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
import {BASE_URL , ACTIVE } from "../../../../../services/Globalvalues";
import Adminapi from "../../../../../services/admin.service";
import NewSidebar from "../../../../Navbar/Navbar";
import SuccessMessage from "../../Alerts/SuccessMessage";

const AllAdmin = () => {
  //const [did, setdid] = useState(0);
  const [nme, setnme] = useState("");
  const [ctc, setctc] = useState("");
  const [nodata, setnodata] = useState(false);
  const [mail, setmail] = useState("");
  const [dept, setdept] = useState("");
  const [statt, setstatt] = useState("");
  const [pos, setpos] = useState("");
  const [pass, setpass] = useState("");
  const [DeleteModal, setDeleteModal] = useState(false);
  const [QueryModal, setQueryModal] = useState(false);
  const [success,setsuccess]= useState(false)
  const handleCancel = () => {
    // hide confirmation modal
    setDeleteModal(false);
    setQueryModal(false);
  };
  
  
  

  const handleConfirm = () => {
        const st = "inactive"
        const Did = parseInt(sessionStorage.getItem('did'),10)
        Adminapi.update(dept,mail,ctc,nme,pass,pos,st,Did).then((res)=>{
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
    const Upid = sessionStorage.getItem('did')
    Adminapi.update(dept,mail,ctc,nme,pass,pos,statt,Upid).then((res) => {
        setQueryModal(false);
        setDeleteModal(false);
        sessionStorage.removeItem('Upid')
        sessionStorage.removeItem('did')
        setsuccess(true)
        setTimeout(()=>{
          setsuccess(false)
        },4000)
        window.location.reload();
      });
  };
  const viewQueryModal = (ele) => {
    let did = ele.id;
    sessionStorage.setItem('did',did)
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
    setstatt(ACTIVE)
  };
  // const handledept = async (event) => {
  //   setdept(event.target.value);
  // };
  // const handlestatt = async (event) => {
  //   setstatt(event.target.value);
  // };
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const clearsearch =() => {
    setSearch("");
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          BASE_URL + `admin/auth/getAllAdminUsers/{status}`,{
            params: {
                status: ACTIVE
            }
          }
        );
        
        setData(data);
        if (data.length === 0) {
          setnodata(true);
        } else {
          setnodata(false);
        }

        
      } catch (error) {
      //  console.log("Error");
      }
    })();
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  },[]);

  return (<>
    <NewSidebar />
    {success && <SuccessMessage message="Admin details updated Successfully"/>}
    <div className={success ?" load":""}>
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
          {nodata && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ color: "brown" }}>No data present here</h3>
            </div>
          )}
          {!nodata && (
            <>
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
                        style={{ marginRight: "5px", cursor: "pointer" }}
                        onClick={() => viewQueryModal(ele)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
                      {"    "}
                      <button onClick={() => Modalview(ele)}
                      style={{ marginRight: "15px", cursor: "pointer" }}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
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
                <label style={{marginBottom:'10px'}}>
              {" "}
              Choose Department:
              <select onChange={(e)=>setdept(e.target.value)} style={{marginLeft:'10px'}}>
                <option value="">Choose department</option>
                <option value="Computer">Computer</option>
                <option value="Mechanical">Mechanical</option>
                <option value="IT">IT</option>
                <option value="Civil">Civil</option>
              </select>
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
                {/* <label>
                  {" "}
                  Status: 
                  <input
                    type="string"
                    value={statt}
                    name=" Form Status"
                    onChange={(e) => handlestatt(e)}
                  />
                </label>
                <br /> */}
                
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
