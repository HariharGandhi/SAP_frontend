import React, { useState, useEffect } from "react";
import NewSidebar from "../../../../Navbar/Navbar";
import "./ContactUsData.css"

function ContactUsTable() {
  const [contactUsData, setContactUsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9190/api/auth/getcontactus")
      .then((response) => response.json())
      .then((data) => setContactUsData(data))
      .catch((error) => console.error(error));

      return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  }, []);

  return (
    <>
      <NewSidebar />
      <div
        // className={
        //   sessionStorage.getItem("sidebar") === "true"
        //     ? "table-nav vform"
        //     : "table-nav"
        // }
        style={{display:'flex',justifyContent:'center',marginTop:'20px'}}
        id="contactus"
      >
        <table>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Module</th>
              <th>Status</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {contactUsData.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.name}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.email}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.mobileNumber}
                    </td>
                    <td style={{ width: "70px", padding: "2px" }}>
                      {ele.module}
                    </td>
                    <td style={{ width: "70px", padding: "2px" }}>
                      {ele.status}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>{" "}
      </div>
    </>
  );
}

export default ContactUsTable;
