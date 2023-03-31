// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";

// const PaymentPage = () => {
//   const [product] = useState({
//     name: "Your Product",
//     price: 9.99,
//     description: "Description of your product",
//   });

//   const [paid, setPaid] = useState(false);

//   const handleToken = (token) => {
//     console.log(token);
//     setPaid(true);
//   };

//   return (
//     <div>
//       {paid ? (
//         <h3>Payment Successful!</h3>
//       ) : (
//         <StripeCheckout
//           stripeKey="YOUR_STRIPE_PUBLIC_KEY"
//           token={handleToken}
//           amount={product.price * 100}
//           name={product.name}
//           description={product.description}
//           currency="USD"
//         />
//       )}
//     </div>
//   );
// };

// export default PaymentPage;
