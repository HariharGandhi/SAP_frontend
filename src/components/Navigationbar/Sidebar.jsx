import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="vertical-navbar">
      <ul>
        {localStorage.getItem('role')==="ROLE_STUDENT" && <>
        <li><a href="#">Home</a></li>
        <li><a href="#">Payment</a></li>
        <li><a href="#">CourseDetails</a></li>
        </>}
        {localStorage.getItem('role')==="ROLE_ADMIN" && 
        <>
        <li><a href="">Home</a></li>
        <li><a href="/getplacement">Placement</a></li>
        <li><a href="/getnotification">Notification</a></li>
        </>}
      </ul>
    </nav>
  );
}

export default Sidebar;