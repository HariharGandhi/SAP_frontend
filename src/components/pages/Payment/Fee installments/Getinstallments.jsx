import React, { useEffect } from 'react';
import Payapi from '../../../../services/Paymentapi';
import NewSidebar from '../../../Navbar/Navbar';
import { useState } from 'react';
import Axios from 'axios';
import { BASE_URL } from '../../../../services/Globalvalues';
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Link } from 'react-router-dom';
import SuccessMessage from '../../dashboard/Alerts/SuccessMessage';
//import axios from 'axios';

const Getinstallments = () => {
  const [success,setsuccess] = useState(false)
  const [itype,setitype] = useState(false)
  const [image, setImage] = useState(null);
  const ID = parseInt(localStorage.getItem('id'));
  const [Data,setData]= useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png","image/jpg"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
    } else {
      setitype(true)
      setTimeout(()=>{
        setitype(false)
      },3000)
    }
  };
  const handleSubmitfee = (ele) => {
    const Sid = parseInt(ele.id,10);
    const SUid = parseInt(ele.userId,10);
    const Image = image;
    const formData = new FormData();
    formData.append('image',Image)
    Axios.post(BASE_URL + 'uploadfeesreceipt', formData ,{
      params:{
        paymantinstallmentIds	: Sid,
        usersID: SUid
      }
    }).then((response)=>{
      setsuccess(true)
      setTimeout(()=> {
        setsuccess(false);
        window.location.href ="/getinstallment"
      },3000)
    })
  }
  
    useEffect(() => {
      (async () => {
             try {
              const { data } = await Payapi.getinstallment(ID);
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
        {success && <SuccessMessage message="Receipt Submited Successfully!"/>}
        <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        >
          
          {!success && <>
          <h1>College SAP Fee Payment </h1>
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
                      {itype && <p style={{color:'red'}}>Only .jpg,.jpeg.png file</p>}
                      {"    "}
                    </td>
                    <td>
                      <button onClick={() => handleSubmitfee(ele)}>Submit</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Card className="sapcontainer" id="sapfee">
            <CardHeader title={<h1>SAP Global Certification Payment</h1>}>
                </CardHeader>
            <CardContent>
                <h4>Click on Make payment to proceed for payment</h4>
                <h6>You will be redirected to Payment Form</h6>
                <h1>{""}</h1>
                <button className='makepayment'>
                <a href='https://docs.google.com/forms/d/1aUcjAvH_puK9lz5fUzrvYZHc_tV23n5wtz0pSpNrJOI/viewform?ts=62975728&edit_requested=true ' target="_blank"rel="noopener noreferrer">Make Payment</a>
            </button>
            <button className='makepayment' style={{marginLeft:'50px'}}> <Link to="/logindone">Cancel</Link></button></CardContent>
            </Card></>}
        </div>
        
    </>)
}

export default Getinstallments;