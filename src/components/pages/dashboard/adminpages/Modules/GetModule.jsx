import React, { useEffect, useState } from "react";
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../Navbar/Navbar";
import Modal from "../../Modal";
import AddModule from "./AddModule";

const GetModule = () => {
    const [addmodal,setaddmodal] = useState(false)
    const Addmodal = () => {
      setaddmodal(true)
    }
    const [Data,setData] = useState([])
    useEffect(() => {
        (async () => {
            const stat = "active"
            try {
                NotificationPlacementapi.getmodules(stat)
                .then((res)=> {
                 
                  setData(res.data)
                })
                
                
                //console.log(Data)
            }
            catch (error) {
                //console.log(error)
            }
        })();
        return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
    }, []);
    return (
        <>
        <NewSidebar />
        
        <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        // id="contactus"
      >
        <button className="place-button" style={{marginTop:'20px', marginLeft:'10px'}} onClick={() => Addmodal() }>Add Module</button>
        <table style={{width:'100%',marginTop:'25px'}}>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Module Id</th>
              <th>Module Name</th>
              <th>Module shortname</th>
              <th>Status</th>
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
                      {ele.moduleName}
                    </td>
                    <td >
                      {ele.moduleShortName}
                    </td>
                    <td >
                      {ele.status}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>{" "}
      </div>
      {addmodal && <>
        <Modal >
          <AddModule closeModal={() => setaddmodal(false)}/>
        </Modal>
      </>}
        </>
    )
}

export default GetModule;