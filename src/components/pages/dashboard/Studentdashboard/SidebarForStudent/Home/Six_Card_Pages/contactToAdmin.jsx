import React from 'react';
import { useEffect } from 'react';
import NewSidebar from '../../../../../../Navbar/Navbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Axios from 'axios';
import { BASE_URL } from '../../../../../../../services/Globalvalues';
import { useState } from 'react';


const ContactToAdmin = () => {
  const [SapUsername, setSapUsername] = useState("")
  const [SapPassword, setSapPassword] = useState("")
  const UId = Number(localStorage.getItem('id'))
  useEffect(() => {
    (async () => {
      try {
    Axios.get(BASE_URL + "getsapcredentialsDetails",{
      params:{
        userIds : UId
      }
    }).then((response)=>{
    
      setSapUsername(response.data.sapUsername)
      setSapPassword(response.data.sapPassword)
    })} catch (error) {
    //  console.log(error);
    }})();
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
},[UId]);

const handleUploadClick = () => {
  window.location.href ="/getinstallment";
}


  return (

<>
  <NewSidebar />
  <Card className="sapcontainer" id="sapfee" style={{ backgroundColor: '#f2f2f2', borderRadius: '10px', padding: '20px' }}>
  <h2  style={{ color: '#666666', marginBottom: '10px' }}>
    {SapUsername ? (
      <>
        This is your credentials
      </>
    ) : (
      <>
        Pay your fees else upload your payment receipt
        <button onClick={handleUploadClick}  style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Upload Now</button>
      </>
    )}
  </h2>
    <CardHeader title={<h1 style={{ color: '#333333', fontWeight: 'bold' }}>Login credentials of SAP</h1>}>
    </CardHeader>
    <CardContent>
      <h2 style={{ color: '#666666' }}>UserName: <span style={{ fontStyle: 'italic', color: '#333333' }}>{SapUsername}</span></h2>
      <h2 style={{ color: '#666666' }}>Password: <span style={{ fontStyle: 'italic', color: '#333333' }}>{SapPassword}</span></h2>
      <h1>{""}</h1>
      {/* <button> </button> */}
      {/* <button style={{marginLeft:'350px'}}> <Link to="/logindone">Cancel</Link></button>*/}
    </CardContent> 
  </Card>
</>




  );
}

export default ContactToAdmin;