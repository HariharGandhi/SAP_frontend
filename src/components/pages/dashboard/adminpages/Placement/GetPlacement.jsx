import React, { useEffect, useState } from "react";
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi";
const Getplace = () => {
  
  const [Data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getplacement().then((response)=>{
          setData(response);
          console.log(response);
        })
        
      } catch (error) {
        console.log("Error");
      }
    })();
  },[]);

  return (
    <>
      <div className="table-nav">
        {/* <input
          className="table-search"
          type="text"
          placeholder="Search Your Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="table-drop" name="cars" id="cars" onChange={(e) => setmod(e.target.value)}>
          <option value="">Select Status </option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button onClick={()=> setSearch("")}>Clear</button> */}
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
                      {ele.placementyear}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Getplace;
