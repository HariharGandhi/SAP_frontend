import React from 'react';
import { Redirect } from 'react-router-dom';

function RoleAuth(Component) {
   
  function AuthGuard(props) {
    if(localStorage.getItem('role') === 'ROLE_STUDENT'){
    
      return <Redirect to="/login" />;
  }
  else {
    if(localStorage.getItem('role') === 'ROLE_ADMIN' || localStorage.getItem('role') === 'ROLE_SUPERADMIN'){
        return <Component {...props} />;
    }}
  
  }
    
  
  return AuthGuard;}


export default RoleAuth;