import React, { useEffect } from "react";
import { useState } from "react";
import NotificationPlacementapi from "../../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../../Navbar/Navbar";
import Modal from "../../../Modal";

const Adminnotification = () => {

    const [data,setData] = useState("")
    const [search, setSearch] = useState("");
    const [searchmod,setsearchmod] = useState("")
    const [UpdateModal,setUpdateModal] = useState(false)

    const clearsearch = () => {
      setSearch("");
      setsearchmod("")
    }
  const viewModal = (ele) => {
    sessionStorage.setItem('userId',ele.userId)
    sessionStorage.setItem('eid',ele.eid)
    setUpdateModal(true);
  };


    useEffect(() => {
        (async () => {
          try {
            const { data } = await NotificationPlacementapi.getall()
                setData(data)
                console.log(data)
          } catch (error) {
            console.log("Error");
          }
        })();
        return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
      }, []);

        return (
            <>
            <NewSidebar />
            <div className="container">
            <label>
          Module :
        <input
          className="table-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /></label>
        
        <select className="table-drop" name="cars" id="cars" onChange={(e) => setsearchmod(e.target.value)}>
          <option value="">Select Module</option>
          <option value="ABAP">ABAP</option>
          <option value="MM">MM</option>
          <option value="PP">PP</option>
          <option value="HR">HR/HCM</option>
          <option value="FICO">FICO</option>
        </select>
        <button onClick={()=> clearsearch()}>Clear</button>
            </div>
        <table>
          <thead>
            <tr className="main-table top-col-table">
              {/*<th>Student_id</th>*/}
              <th>Notification ID</th>
              <th>Name </th>
              <th>Title</th>
              <th>Module</th>
              <th>Body</th>
              <th>Creation Date & Time</th>
              <th>Status</th>
              <th>File </th>
              <th>Action</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search)
              }).filter((item) => {
                return searchmod.toLowerCase() === ""
                  ? item
                  : item.sapModule.toLowerCase().includes(searchmod)
                }).map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td style={{ width: "80px", padding: "2px" }}>
                      {ele.id}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.name}
                    </td>
                    <td style={{ width: "80px", padding: "2px" }}>
                      {ele.title}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.notificationmodule}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.body}
                    </td>
                    <td style={{ width: "120px", padding: "2px" }}>
                      {ele.createdDateTime}
                    </td>
                    <td style={{ width: "50px", padding: "2px" }}>
                      {ele.status}
                    </td>
                    <td style={{ width: "100px", padding: "2px" }}>
                      {ele.file}
                    </td>
                    
                    <td style={{ width: "100px", padding: "2px" }}>
                      <button
                        style={{ marginRight: "5px" }}
                        onClick={() => viewModal(ele)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      {"    "}
                      <button /*onClick={() => Modalview(ele)}*/>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {UpdateModal && <>
        <Modal>

        </Modal>
        </>

        }
            </>
        )
}

export default Adminnotification;