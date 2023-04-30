import React, { useEffect } from 'react';
import Paymentapi from '../../../../services/Paymentapi';
import NewSidebar from '../../../Navbar/Navbar';
import { useState } from 'react';
//import axios from 'axios';

const Getinstallments = () => {

  const [image, setImage] = useState(null);

  const ID = parseInt(localStorage.getItem('id'));
  const [Data,setData]= useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png","image/jpg"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
    } else {
      alert("Please choose a valid image file (JPG or JPEG or PNG).");
    }
  };
  const handleSubmitfee = (element) => {
    const Sid = element.id;
    const Sinstallment = element.installment;
    const Sinstamount = element.installmentAmount;
    const Snointall = element.noOfInstallment;
    const Stotal = element.totalFees;
    const Sstatus = element.installmentStatus;
  }
  
    useEffect(() => {
      (async () => {
             try {
              const { data } = await Paymentapi.getinstallment(ID);
               setData(data);
              //  console.log(data);
             } catch (error) {
               console.log(error);
             }
           })();
      return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
        },[ID]);
    return (<>
        <NewSidebar />
        <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        >
        <table style={{width:"100%", marginTop:'20px'}}>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Installment</th>
              <th>Amount of Installment</th>
              <th>Total No.of Installment</th>
              <th>Total Fees</th>
              <th>Status of payment</th>
              <th><i className="fas fa-upload" /> Upload Fee Receipt Image</th>
              <th>Submit</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {Data
              .map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td >
                      {ele.installment}
                    </td>
                    <td >
                      {ele.installmentAmount}
                    </td>
                    <td >
                      {ele.noOfInstallment}
                    </td>
                    <td >
                      {ele.totalFees}
                    </td>
                    <td >
                      {ele.installmentStatus}
                    </td>
                    <td >
                      <button
                        style={{ marginRight: "5px", marginBottom:'5px',marginTop:'5px',width:'max-content'}}
                      >
                        <input type="file" className="d-none" accept=".jpg,.jpeg,.png" onChange={handleFileUpload} />
                      </button>
                      {"    "}
                    </td>
                    <td>
                      <button onclick={(e) => handleSubmitfee(ele)}>Submit</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
        
    </>)
}

export default Getinstallments;