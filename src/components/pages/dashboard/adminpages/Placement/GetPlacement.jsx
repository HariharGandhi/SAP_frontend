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
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
  },[]);

  return (
    <>
    <NewSidebar />
    <div className="getplace" style={{display:'flex',justifyContent:'center'}}>
      <div className={sessionStorage.getItem('sidebar')==="true"?"table-nav vform":"table-nav"} style={{marginTop:'20px'}}>
        <table style={{width:'100%'}}>
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
                    <td >
                      {ele.id}
                    </td>
                    <td >
                      {ele.placementpackage}
                    </td>
                    <td >
                      {ele.imageUrl}
                    </td>
                    <td >
                      {ele.name}
                    </td>
                    <td >
                      {ele.companyname}
                    </td>
                    <td >
                      {ele.module}
                    </td>
                    <td >
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
