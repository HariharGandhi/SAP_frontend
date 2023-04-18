import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SAPfee.css";
import NewSidebar from "../../Navbar/Navbar";
import { Card, CardContent, CardHeader } from "@material-ui/core";
const SAPfee = () => {
    useEffect(() => {
        return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
      });
    return (
        <>
            <NewSidebar />
            <Card className="sapcontainer" id="sapfee">
            <CardHeader title={<h1>SAP Payment</h1>}>
                </CardHeader>
            <CardContent>
                <h4>Click on Make payment to proceed for payment</h4>
                <h6>You will be redirected to Payment Form</h6>
                <h1>{""}</h1>
                <button>
                <a href='https://docs.google.com/forms/d/1aUcjAvH_puK9lz5fUzrvYZHc_tV23n5wtz0pSpNrJOI/viewform?ts=62975728&edit_requested=true ' target="_blank"rel="noopener noreferrer">Make Payment</a>
            </button>
            <button style={{marginLeft:'350px'}}> <Link to="/logindone">Cancel</Link></button></CardContent>
            </Card>
        </>
    )
}

export default SAPfee;