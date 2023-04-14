import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const SAPfee = () => {
    useEffect(() => {
        return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
      });
    return (
        <>
            <div className="container">
                <h1>Click on Make Payment</h1>
                <h4>You will be redirected to Payment Form</h4>
                <button>
                <a href='https://docs.google.com/forms/d/1aUcjAvH_puK9lz5fUzrvYZHc_tV23n5wtz0pSpNrJOI/viewform?ts=62975728&edit_requested=true ' target="_blank"rel="noopener noreferrer">Make Payment</a>
            </button>
            <button> <Link to="/logindone">Back to Home</Link></button>
            </div>
        </>
    )
}

export default SAPfee;