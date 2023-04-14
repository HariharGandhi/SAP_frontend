import React, { useEffect } from 'react';
import Paymentapi from '../../../../services/Paymentapi';
import NewSidebar from '../../../Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';

const Getinstallments = () => {
  const [paymentData, setPaymentData] = useState(null);

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

  const ID = parseInt(localStorage.getItem('id'));
  const [Data,setData]= useState([]);
  const Gotopayment = (ele) => {
  // ele.preventDefault();
  const amount = Number(ele.installmentAmount)
  console.log(amount)
  displayRazorpay(amount);
  
  async function displayRazorpay(amount) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    console.log(res);
    if (!res) {
      alert('You are offline... Failed to load Razorpay SDK');
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
        
        
        if(P_id !== null){
          console.log("inside success")
          try {
            const response = axios.get(
              `https://api.razorpay.com/v1/payments/${P_id}`,
              {
                auth: {
                  username: "rzp_test_jJa0WloN5mKHtI",
                  password: "WZ22YB7OWxGmKojSuk3gvOgL",
                },
              }
            ).then((res)=> {
              setPaymentData(response.data);
              console.log(paymentData.card.type);
              console.log("Payment Details : ",JSON.stringify(paymentData));
              window.location.href = "/getinstallment";
          });
            
          } catch (error) {
            console.error(error);
          }
          
        }
        if(P_id === null){ 
          alert("Payment failed");
          window.location.href ="/payment"
        }

      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  }


//  const handlepay = (e) => {
//   e.preventDefault();
//   console.log(amount);
//   localStorage.setItem('amount',amount)
//   displayRazorpay(amount);
    
//  };
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
              <th>Action</th>
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
                        style={{ marginRight: "5px" }}
                        onClick={() => Gotopayment(ele)}
                      >
                        Pay now
                      </button>
                      {"    "}
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