// import React from 'react';
// import { useState } from 'react';
// const Payment = () => {
//     const [amount,setamount] = useState(0)
//     var formatter = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "INR",
    
//         // These options are needed to round to whole numbers if that's what you want.
//         minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//         //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
//       });
    
//       const loadScript = (src) => {
//         return new Promise((resovle) => {
//           const script = document.createElement("script");
//           script.src = src;
    
//           script.onload = () => {
//             resovle(true);
//           };
    
//           script.onerror = () => {
//             resovle(false);
//           };
    
//           document.body.appendChild(script);
//         });
//       };
    
//       const displayRazorpay = async (amount) => {
//         const res = await loadScript(
//           "https://checkout.razorpay.com/v1/checkout.js"
//         );
    
//         if (!res) {
//           alert("You are offline... Failed to load Razorpay SDK");
//           return;
//         }
    
//         const options = {
//           key: "rzp_test_jJa0WloN5mKHtI",
//           currency: "INR",
//           amount: amount * 100,
//           name: "Hari",
//           description: "Transaction Completed",
    
//           handler: function (response) {
//             alert(response.razorpay_payment_id);
//             alert("Payment Successfully");
//           },
//         //   prefill: {
//         //     name: "code with akky",
//         //   },
//         };
    
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//       };
//       const handleamount = (e) => {
//         const final = formatter.format(e)
//         setamount(final)
//       }
//       const handlepay =() =>{
//         console.log(amount)
//         displayRazorpay(amount)
//       }
//       return (
//         <>
//             <div className='container' style={{display:'flex',justifyContent:'center'}}>
//               <form>
//                     <label>
//                         <h2>Enter amount of payment:</h2>
//                     </label>
//                     <input type="number" onChange={(e)=>handleamount(e)} />
//                     <button onClick={() => handlepay()} style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>Pay now</button>
//               </form> 
//             </div>
            
//         </>
//       )
// }

// export default Payment;

import React from 'react';
import { useState } from 'react';

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

  const displayRazorpay = async (amount) => {
    
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
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
  };

  const handleamount = (e) => {
    setamount(Number(e.target.value));
  };

  const handlepay = () => {
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
            onClick={() => handlepay()}
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
