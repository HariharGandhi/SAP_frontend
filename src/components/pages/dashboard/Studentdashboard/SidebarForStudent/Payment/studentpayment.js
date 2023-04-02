import React from 'react';
import { Link } from 'react-router-dom';
import NewSidebar from '../../../../../Navbar/Navbar';
import "./studentpayment.css"

function Payment() {
  return (
    <>
      <NewSidebar />


      <h2>you can pay your fees  and search payment history</h2>
      <div className='payment'>
        <Link to="/paypayment">
          <button>Pay Your Fees</button>
        </Link>
        <Link to="/page2">
          <button>Payment History</button>
        </Link>
      </div>
    </>
  );
}

export default Payment;
