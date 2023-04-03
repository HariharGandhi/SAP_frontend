import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../../services/Globalvalues';

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
      alert('You are offline... Failed to load Razorpay SDK');
      return;
    }
    const options = {
      key: 'rzp_test_jJa0WloN5mKHtI',
      currency: 'INR',
      amount: amount * 100,
      name: 'Hari',
      description: 'Transaction Completed'
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.success', function(response) {
      console.log('payment success:', response);
      // Make API call to update payment status
      fetch(BASE_URL + 'updatePayentInstallment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //payment_id: response.razorpay_payment_id,
          installmentAmount: amount,
          installmentStatus:"PAID",
          noOfInstallment:1,
          id: 1,
          totalFees:30000,
          installment:1,
          userId:1
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
          // Redirect to success page
          window.location.href = "/getinstallment";
        })
        .catch((error) => {
          console.error('API error:', error);
          // Redirect to error page
          window.location.href = '/payment';
        });
    });
    
  }

 const handleamount = (e) => {
   setamount(Number(e.target.value));
 };

 const handlepay = (e) => {
  e.preventDefault();
  console.log(amount);
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
