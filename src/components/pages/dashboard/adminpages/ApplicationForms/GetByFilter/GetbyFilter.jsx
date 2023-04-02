// import React ,{ useEffect, useState} from "react";
// import axios from "axios";
// export default function GetbyFilter(name,module,dept,status) {
    
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         (async () => {
//           try {
//             const { data } = await axios.get("http://localhost:9190/api/fetchlistofApplicationFormbyfilter",{
//                 params: {
//                     pagenum : 0,
//                     pagesize : 20,
//                     email: "",
//                     studentId: "",
//                     name: name,
//                     collegeEmail: "",
//                     sapModule: module,
//                     contactNumber: "",
//                     passoutYear: "",
//                     branch: dept,
//                     specialization: "",
//                     studentType: "",
//                     adhaarCard: "",
//                     applicationFromStatus: status,
//                     uploadImage: "",
//                     userId: ""
      
//                 }
//             });
//             setData(data.records);
//             console.log(data);
//           } catch (error) {
//             console.log("Error");
//           }
//         })();
//       }, [name,status,dept,module]);

//     return (<>
//         <table style={{ width: "100%", marginTop: "25px" }}>
//           <thead>
//             <tr className="main-table top-col-table" id="tab">
//               {/*<th>Student_id</th>*/}
//               <th>Adhar card</th>
//               <th>Application status</th>
//               <th>Branch</th>
//               <th>College Email</th>
//               <th>Contact No.</th>
//               <th>Email</th>
//               <th>Query in Application</th>
//               <th>Name</th>
//               <th>Passout year</th>
//               <th>Sap Module</th>
//               <th>Specilization</th>
//               <th>Student Type</th>
//               <th>Upload img</th>
//               <th>Action</th>
//               {/*<th>User_id</th>*/}
//             </tr>
//           </thead>
//           <tbody>
//             {data
//               .map((ele) => {
//                 return (
//                   <tr key={ele.id} className="main-table">
//                     <td>{ele.adhaarCard}</td>
//                     <td>{ele.applicationFromStatus}</td>
//                     <td>{ele.branch}</td>
//                     <td>{ele.collegeEmail}</td>
//                     <td>{ele.contactNumber}</td>
//                     <td>{ele.email}</td>
//                     <td>{ele.isQueryInApplication ? "Yes" : "No"}</td>
//                     <td>{ele.name}</td>
//                     <td>{ele.passoutYear}</td>
//                     <td>{ele.sapModule}</td>
//                     <td>{ele.specialization}</td>
//                     <td>{ele.studentType}</td>
//                     <td>{ele.uploadImage}</td>
//                     <td>
//                       <button
//                         style={{ marginRight: "5px", cursor: "pointer" }}
//                         onClick={() => viewModal(ele)}
//                         title="Verify Form"
//                       >
//                         <i className="far fa-edit"></i>
//                       </button>
//                       {"    "}
//                       <button
//                         onClick={() => Modalview(ele)}
//                         title="Delete Form"
//                         style={{ marginRight: "5px", cursor: "pointer" }}
//                       >
//                         <i className="fa fa-trash" aria-hidden="true"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         {/* {DeleteModal && (
//           <Modal>
//             <div>
//               <h2>Are you sure you want to delete?</h2>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "right",
//                   alignItems: "right",
//                 }}
//               >
//                 <button
//                   className="btn-md"
//                   onClick={handleConfirm}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Yes
//                 </button>
//                 <button onClick={handleCancel}>No</button>
//               </div>
//             </div>
//           </Modal>
//         )}
//         {VerifyModal && (
//           <Modal style={{ justifyContent: "center", display: "flex",alignItems:"center" }}>
//             <VerifyFormmodal style={{justifyContent: "center", display: "flex",alignItems:"center",margin:"auto"}}/>
//             <div style={{justifyContent: "center", display: "flex",alignItems:"center"}}>
//               <button
//                 className="btn-md"
//                 onClick={handleVerify}
//                 style={{
//                   marginRight: "20px",
//                   cursor: "pointer",
//                   width: "100px",
//                   height: "25px",
//                 }}
//               >
//                 Verify
//               </button>
//               <button
//                 className="btn-md"
//                 onClick={handleCancel}
//                 style={{ cursor: "pointer", width: "100px", height: "25px" }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </Modal>
//         )}
//         {UpdateModal && (
//           <Modal>
//             <div>
//               <div>
//                 <h2>Change the status of this application to :</h2>
//                 <dropdown>
//                   <select
//                     name=""
//                     id=""
//                     onChange={(e) => setstat(e.target.value)}
//                   >
//                     <option value="">Select status</option>
//                     <option value="verified">Verified</option>
//                     <option value="notverified">Not Verified</option>
//                     <option value="inquery">In Query</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </dropdown>
//                 {stat === "inquery" && (
//                   <>
//                     <div>
//                       <h2>Enter Query details: </h2>
//                       <form>
//                         <label>
//                           {" "}
//                           Enter Query Title
//                           <input
//                             type="string"
//                             value={title}
//                             name="Title"
//                             onChange={(e) => handletitle(e)}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           {" "}
//                           Enter Query Description
//                           <input
//                             type="string"
//                             value={desc}
//                             name="Description"
//                             onChange={(e) => handledesc(e)}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           {" "}
//                           Enter Name of faculty to Reachout:
//                           <input
//                             type="string"
//                             value={rname}
//                             name="Name of faculty"
//                             onChange={(e) => handlername(e)}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           {" "}
//                           Enter Faculty details:
//                           <input
//                             type="string"
//                             value={rdet}
//                             name="Faculty designation"
//                             onChange={(e) => handlerdet(e)}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           {" "}
//                           Enter Contact no. of Faculty:
//                           <input
//                             type="string"
//                             value={ctc}
//                             name="Contact"
//                             onChange={(e) => handlectc(e)}
//                           />
//                         </label>
//                         <br />
//                         <button
//                           type="submit"
//                           onClick={() => Query()}
//                           className="btn btn-outline-white"
//                           style={{
//                             margin: "auto",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {" "}
//                           Post Query{" "}
//                         </button>
//                         <button
//                           className="btn btn-outline-white"
//                           onClick={handleCancel}
//                           style={{ marginLeft: "10px", cursor: "pointer" }}
//                         >
//                           cancel
//                         </button>
//                       </form>
//                     </div>
//                   </>
//                 )}
//                 {stat !== "inquery" && (
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "right",
//                       alignItems: "right",
//                     }}
//                   >
//                     <button
//                       className="btn-md"
//                       onClick={handleUpdate}
//                       style={{ marginRight: "10px" }}
//                     >
//                       Update
//                     </button>
//                     <button onClick={handleCancel}>Cancel</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Modal>
//         )}
//       </div> */}
//     </>
//     )

// }