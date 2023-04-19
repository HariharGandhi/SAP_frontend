import React from 'react';
import { useEffect } from 'react';
import NewSidebar from '../../../../../../Navbar/Navbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const ContactToAdmin = () => {
  useEffect(() => {
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
  return (
    <>
            <NewSidebar />
            <Card className="sapcontainer" id="sapfee">
            <CardHeader title={<h1>Login credentials of SAP</h1>}>
                </CardHeader>
            <CardContent>
                <h3>UserName: </h3>
                <h4>Password: </h4>
                <h1>{""}</h1>
                {/* <button>
                
            </button>
            <button style={{marginLeft:'350px'}}> <Link to="/logindone">Cancel</Link></button>*/} </CardContent> 
            </Card>
        </>
  );
}

export default ContactToAdmin;