import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
//import "./NewNav.css"
import "./Verifyform.css"


const VerifyForm = () => {
    const Uid = Number(localStorage.getItem('Userid'))
    const [stat, setstat] = useState("")
    const [VerifyformModal, setVerifyformModal] = useState(false)
    
  
    const handleVerify = () => {
      axios.put(`http://localhost:9190/api/applicationFormStatusUpdate/${Uid}/${stat}`)
      .then((res)=>{
        console.log(res)
        setVerifyformModal(false);
        window.location.reload();
      })
    }
    const handleCancel = () => {
        // hide confirmation modal
        setVerifyformModal(false)
      }

   
  const [data, setData] = useState([]);
  //const [search, setSearch] = useState('')
  useEffect(() => {
            (async () => {
              try {
                const { data } = await axios.get("http://localhost:9190/api/getDetailsByUserid/{UserId}",{
                  params : {
                    UserId : Uid
                  }
                });
                setData(data);
                //setSid(data.records.student_id);
              } catch (error) {
                console.log(error);
              }
            })();
          },[Uid]);

  return (
    <>
      <div className="container">
      <table>
      {data.map(item => (
      <tbody >
          <tr key={item.id}>
            <td> Photo</td>
            <td>{item.uploadImage}</td>
          </tr>
          <tr key={item.email}>
            <td> Email</td>
            <td>{item.email}</td>
          </tr>
          <tr key={item.name}>
            <td> Name</td>
            <td>{item.name}</td>
          </tr>
          <tr key={item.sapModule}>
            <td> SAP Module</td>
            <td>{item.sapModule}</td>
          </tr>
          <tr key={item.branch}>
            <td> Branch</td>
            <td>{item.branch}</td>
          </tr>
          <tr key={item.contactNumber}>
            <td> Contact Number</td>
            <td>{item.contactNumber}</td>
          </tr>
          <tr key={item.passoutYear}>
            <td> Year of Passout</td>
            <td>{item.passoutYear}</td>
          </tr>
          <tr key={item.studentType}>
            <td>Type of student</td>
            <td>{item.studentType}</td>
          </tr>
          <tr key={item.adhaarCard}>
            <td> Adhar Card Number</td>
            <td>{item.adhaarCard}</td>
          </tr>
          <tr key={item.applicationFromStatus}>
            <td> Application Form Status</td>
            <td>{item.applicationFromStatus}</td>
          </tr>
          <tr key={item.isQueryInApplication}>
            <td>Is Query present in application</td>
            <td>{item.isQueryInApplication?"Yes":"No"}</td>
          </tr>
      </tbody>))}
    </table>

        
        {VerifyformModal && 
          <Modal>
      <div>
      <div>
              <h2>Change the status of this application to :</h2>
              <dropdown>
                <select name="" id="" onChange={(e) => setstat(e.target.value)}>Select status
                <option value="verified">Verified</option>
                <option value="notverified">Not Verified</option>
                <option value="inquery">In Query</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
              </dropdown>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <button
                  className="btn-md"
                  onClick={handleVerify}
                  style={{ marginRight: "10px" }}
                >
                  Yes
                </button>
                <button onClick={handleCancel}>No</button>
              </div>
            </div>
      </div>

          </Modal>
        }
      </div>
    </>
  );
};
export default VerifyForm;
