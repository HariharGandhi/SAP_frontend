import React from 'react';
import NewSidebar from '../../../../../../Navbar/Navbar';
import "./adminDetails.css"
import { useEffect } from 'react';





const AdminDetails = () => {
  useEffect(() => {
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
  return (<>
    {/* <admindetails /> */}
    <NewSidebar />
    <div className="adminDetails"
    // 
    >
    <div>
    <img src="../../../../../../Images/College.jpg" alt="mam" />
      <h1>Dr.A.B.Pawar </h1>
      <h2>Dean Acadamics Of Computer Engineering Kopergoan</h2>
      <h3>Mobile no: 1234567890</h3>
      <h3>Gmail-xyz@gmail.com</h3>
    </div>
    <hr />
    <br/>
    <div>
    <img src="../../../../../../Images/College.jpg" alt="mam" />
      <h1>Sayli salkar Mam</h1>
      <h2>from Computer Department(SAP cordinator)</h2>
      <h3>Mobile no. 1234567890</h3>
      <h3>Gmail- Saylimam@gmail.com</h3>
      </div>
      <hr />
      <br/>
    <div>
    <img src="../../../../../../Images/College.jpg" alt="mam" />
      <h1>Patil mam</h1>
      <h2>from IT Department</h2>
      <h3>Mobile no. 1234567890</h3>
      <h3>Gmail- xyz@gmail.com</h3>
      </div>
      <hr />
      <br/>
    <div>
    <img src="../../../../../../Images/College.jpg" alt="patil" />
      <h1>Patil mam</h1>
      <h2>from IT Department</h2>
      <h3>Mobile no. 1234567890</h3>
      <h3>Gmail- xyz@gmail.com</h3>
      </div>
      <hr />
      <br/>
    <div>
    <img src="../../../../../../Images/College.jpg" alt="mam" />
      <h1>Patil mam</h1>
      <h2>from IT Department</h2>
      <h3>Mobile no. 1234567890</h3>
      <h3>Gmail- xyz@gmail.com</h3>
      </div>
      <br/>
     
    <div>
     <img src="../../../../../../Images/College.jpg" alt="Mam" />
      <h1>Patil mam</h1>
      <h2>from IT Department</h2>
      <h3>Mobile no. 1234567890</h3>
      <h3>Gmail- xyz@gmail.com</h3>
      </div>
    </div>

    </>
  );
}

export default AdminDetails;
