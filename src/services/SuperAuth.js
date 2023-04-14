import React from 'react';
import { Redirect } from 'react-router-dom';

function SuperAuth(Component) {
   
  function AuthGuard(props) {
    if(localStorage.getItem('role') !== 'ROLE_SUPERADMIN' ){
    //const isAuthenticated = false; // replace with your authentication logic
    
      return <Redirect to="/login" />;
  }
  else {
    if(localStorage.getItem('role') === 'ROLE_SUPERADMIN'){
        return <Component {...props} />;
    }}
  
  }
    
  
  return AuthGuard;}


export default SuperAuth;