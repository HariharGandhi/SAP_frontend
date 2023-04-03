import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Verifyformmodal.css"
import {BASE_URL} from "../../../../../services/Globalvalues";


const VerifyFormmodal = () => {
    const Uid = Number(localStorage.getItem('Userid'))
    
   
  const [data, setData] = useState([]);
  //const [search, setSearch] = useState('')
  useEffect(() => {
            (async () => {
              try {
                const { data } = await axios.get(BASE_URL + "api/getDetailsByUserid/{UserId}",{
                  params : {
                    UserId : Uid
                  }
                });
                setData(data);
                console.log(Uid)
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

      </div>
    </>
  );
};
export default VerifyFormmodal;
