import React, { useEffect, useState } from "react";
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../Navbar/Navbar";
import "./GetPlacement.css"
const Getplace = () => {
  
  const [Data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getplacement().then((response)=>{
          console.log(response.data);
          setData(response.data);
          
        })
      } catch (error) {
        console.log("Error");
      }
    })();
  },[]);

  return (
    <>
    <NewSidebar />
    <div className="getplace" style={{display:'flex',justifyContent:'center'}}>
      <div className="table-nav" style={{marginTop:'10px'}}>
        <table>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Id</th>
              <th>Package Recieved</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Module</th>
              <th>Year of Placement</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {Data.map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.id}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.placementpackage}
                    </td>
                    <td style={{ width: "60px", padding: "2px" }}>
                      {ele.imageUrl}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.name}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.companyname}
                    </td>
                    <td style={{ width: "80px", padding: "2px" }}>
                      {ele.module}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.placementYear}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div> </>
  );
};
export default Getplace;
