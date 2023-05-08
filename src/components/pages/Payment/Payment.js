import React from 'react';
import { useState } from 'react';
// import { BASE_URL } from '../../../services/Globalvalues';
// import axios from 'axios';

const Payment = () => {
  
  const [amount, setamount] = useState(0);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  async function displayRazorpay(amount) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    console.log(res);
    if (!res) {
      
      return;
    }
    const options = {
      key: 'rzp_test_jJa0WloN5mKHtI',
      currency: 'INR',
      amount: amount * 100,
      name: 'Sanjivani SAP',
      description: 'Transaction Completed',
      handler: function (response) {
        //const Amount = Number(localStorage.getItem('amount'))
        const P_id = response.razorpay_payment_id;
        const Card = response.razorpay_card_id;
        console.log(Card,P_id)
        // let arr = [
        //   {
        //     id: 1,  
        //     installment:1,
        //     installmentAmount: Amount,
        //     installmentStatus:"PAID",
        //     noOfInstallment:1,
        //     totalFees:30000,
        //     userId:1
        // }
        // ]
        if(P_id !== null){
          console.log("inside success")
          let res = {
            "Payment Id" : response.razorpay_payment_id,
            "OrderId" : response.razorpay_order_id,
            "CardId" : response.razorpay_card_id,
            "Signature" : response.razorpay_signature,
            "Payment_link": response.razorpay_payment_link_id
          }
          console.log(res)
          
          window.location.href = "/getinstallment"
          // axios.post(BASE_URL + 'updatePayentInstallment',arr)
          // .then((res)=>{
          //   console.log(res);
          //   localStorage.removeItem('amount');
          //     window.location.href = "/getinstallment";
          // })
        }
        if(P_id === null){ 
          
          window.location.href ="/payment"
        }

      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  }

 const handleamount = (e) => {
   setamount(Number(e.target.value));
   
 };

 const handlepay = (e) => {
  e.preventDefault();
  console.log(amount);
  localStorage.setItem('amount',amount)
  displayRazorpay(amount);
    
 };

  return (
    <>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <form>
          <label>
            <h2>Enter amount of payment:</h2>
          </label>
          <input type="number" onChange={(e) => handleamount(e)} />
          <button
            onClick={(e)=>handlepay(e)}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
          >
            Pay now
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
