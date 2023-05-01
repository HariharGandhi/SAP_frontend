import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import applicationformservice from "../../../../services/applicationformservice";
import Paymentapi from "../../../../services/Paymentapi";
import { NOTVERIFIED } from "../../../../services/Globalvalues";
const PostInstallment = () => {
  //const [Data,setData] = useState("")
  // const [] = useState("")
  const UserID = parseInt(localStorage.getItem('Userid'),10)
  console.log(UserID)
  const [install, setinstall] = useState("");
  const [first, setfirst] = useState(0);
  const [second,setsecond] = useState(0);
  const [third,setthird] = useState(0);
  const [total_fee, settotal_fee] = useState(0);
  async function sendData(installmentdata) {
    
    await Paymentapi.postinstallment(installmentdata);
    console.log("installment",installmentdata);
      
    const stat="verified";
    const q = false
    await axios
    .put(
      `http://localhost:9190/api/applicationFormStatusUpdate/${Stid}/${stat}/${q}`
    )
    .then((res) => {
      localStorage.removeItem("Userid");
      localStorage.removeItem("Aid");
      window.location.reload();
    });
  }
  const Stid = parseInt(localStorage.getItem("Aid"), 10);
  console.log(Stid)
  const handletotalfee = (event) => {
    settotal_fee(event.target.value)
  }
  const handlefirst = (event) => {
    setfirst(event.target.value)
  }
  const handlesecond = (event) => {
    setsecond(event.target.value)
  }
  const handlethird = (event) => {
    setthird(event.target.value)
  }
  const Submitdata = (event) => {
    event.preventDefault();
    let installmentData = []
    if(install === "1"){
      installmentData = [
        {
          userId : UserID,
          installment: 1,
          installmentAmount : total_fee,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 1,

        }
      ]
    }
    if(install === "2"){
      installmentData = [
        {
          userId : UserID,
          installment: 1,
          installmentAmount : first,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 2,
          
        },
        {
          userId : UserID,
          installment: 2,
          installmentAmount : second,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 2,
          
        }
      ]
    }
    if(install === "3"){
      installmentData = [
        {
          userId : UserID,
          installment: 1,
          installmentAmount : first,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 3,
          
        },
        {
          userId : UserID,
          installment: 2,
          installmentAmount : second,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 3,
          
        },
        {
          userId : UserID,
          installment: 3,
          installmentAmount : third,
          totalFees : total_fee,
          installmentStatus: NOTVERIFIED,
          noOfInstallment : 3,
          
        }
      ]
    }
    // console.log("new",installmentData);
    sendData(installmentData)
  }
  const handlecancel = () => {
    window.location.href ="/allform"
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await applicationformservice.getformbystid(Stid);
        //setData(data);
        console.log(data.studentType);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, [Stid]);
  return (
    <>
      
      <div>
        <h2>Select number of installments : </h2>
        <dropdown>
          <select name="" id="" onChange={(e) => setinstall(e.target.value)}>
            <option value="">Select number</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </dropdown>
      </div>
      <button onClick={handlecancel} style={{width:'100px',marginTop:'10px'}}>Cancel</button>
      {install === "1" && (
        <>
          <label>Enter total fees :
          <input value={total_fee} onChange={handletotalfee}/></label>
        <button onClick={Submitdata}style={{width:'100px',marginTop:'10px'}}> Post Fees</button>
        </>
      )}
      {install === "2" && (
        <>
        <div className="container">
          <label>Enter total fees :
          <input value={total_fee} onChange={handletotalfee}/></label>
          <label style={{marginTop:'10px'}}>Enter 1st installment : 
          <input value={first} onChange={handlefirst}/></label>
          <label style={{marginTop:'10px'}}>Enter 2nd installment : 
          <input value={second} onChange={handlesecond}/></label>
          <button onClick={Submitdata} style={{width:'100px',marginTop:'10px'}}> Post Fees</button>
          </div>
        </>
      )}
      {install === "3" && (
        <>
          <label>Enter total fees :
          <input value={total_fee} onChange={handletotalfee}/></label>
          <label style={{marginTop:'10px'}}>Enter 1st installment : 
          <input value={first} onChange={handlefirst}/></label>
          <label style={{marginTop:'10px'}}>Enter 2nd installment : 
          <input value={second} onChange={handlesecond}/></label>
          <label style={{marginTop:'10px'}}>Enter 3rd installment : 
          <input value={third} onChange={handlethird}/></label>
          <button onClick={Submitdata} style={{width:'100px',marginTop:'10px'}}> Post Fees</button>
        </>
      )}
    </>
  );
};

export default PostInstallment;
