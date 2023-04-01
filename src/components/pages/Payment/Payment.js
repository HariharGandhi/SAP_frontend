import React from 'react';
import NewSidebar from '../../Navbar/Navbar';
//import { useState } from 'react';
const Payment = (Fee) => {
  const fee = parseInt(Fee,10)
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    //

    const options = {
        key: 'rzp_test_jJa0WloN5mKHtI', // Enter the Key ID generated from the Dashboard
        amount: fee*100,
        currency: "INR",
        name: "Sanjivani SAP",
        description: "SAP FEE",
        handler: async function (response) {
            const data = {
                //orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            //const result = await axios.post("http://localhost:5000/payment/success", data);

            alert(data.msg);
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
      return (
        <>
            <NewSidebar />
            <div className='container' style={{display:'flex',justifyContent:'center'}}>
              <form>
                    <label>
                        <h2>Enter amount of payment:</h2>
                    </label>
                    {/* <input type="number" onChange={(e)=>handleamount(e)} /> */}
                    <button onClick={displayRazorpay()} style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>Pay now</button>
              </form> 
            </div>
            
        </>
      )
}

export default Payment;
//--------------------------------------------------------------------------------------------------------
// import React from 'react';
// import { useEffect } from 'react';
// //import { useState } from 'react';
// import Navbarforhome from "../Home/Navbarforhome"

// const Payment = () => {
//   //const [amount, setamount] = useState(0);

//   // const loadScript = (src) => {
//   //   return new Promise((resolve) => {
//   //     const script = document.createElement('script');
//   //     script.src = src;
//   //     script.onload = () => {
//   //       resolve(true);
//   //     };
//   //     script.onerror = () => {
//   //       resolve(false);
//   //     };
//   //     document.body.appendChild(script);
//   //   });
//   // };

//   const displayRazorpay = (fee) => {
    
//     // const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
//     // if (!res) {
//     //   alert('You are offline... Failed to load Razorpay SDK');
//     //   return;
//     // }
//     const options = {
//       key: 'rzp_test_jJa0WloN5mKHtI',
//       currency: 'INR',
//       amount: fee * 100,
//       name: 'SAP Fee',
//       description: 'Transaction Completed',

//       handler: function (response) {
//         alert("Payment ID: ",response.razorpay_payment_id);
//         alert("Payment Successfully");
//       },
//     };
    
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   // const handleamount = (e) => {
//   //   setamount(parseInt(e.target.value,10));
//   // };

//   const handlepay = () => {
//     const amount = 100
//     console.log(typeof(amount));
//     displayRazorpay(amount);
//   };
//   // useEffect(() => {
//   //   loadScript("https://checkout.razorpay.com/v1/checkout.js");
//   // }, []);

//   return (
//     <>
//       <Navbarforhome />
//       <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
//         <form>
//           <label>
//             <h2>Enter amount of payment:</h2>
//           </label><br />
//           {/* <input type="number" onChange={(e) => handleamount(e)} /> */}
//           <button
//             onClick={() => handlepay()}
//             style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
//           >
//             Pay now
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Payment;
