import React from 'react';
import Navbar from '../../../../Navigationbar/Navbar';
// import Sidebar from '../../../../Navigationbar/Sidebar';
// import Createadmin from '../../SuperAdmin/CreateAdmin/Createadmin';
// import AllAdmin from '../../SuperAdmin/ViewAdmin/ViewAdmin';
// import Viewform from '../ApplicationForms/Viewform/Viewform';
// import Addnotification from '../Notifications/AddNotification/AddNotification';
//import Postplace from '../Placement/AddPlacement';
import Getplace from '../Placement/GetPlacement';

const AdminDashboard = () => {
    return (
        <>
        <Navbar />
        {/* <Sidebar /> */}
        {/* <Viewform /> */}
        {/* <Postplace /> */}
        <Getplace />
        {/* <AllAdmin /> */}
        {/* <Createadmin /> */}
        {/* <Addnotification /> */}
        </>
    )
}

export default AdminDashboard;