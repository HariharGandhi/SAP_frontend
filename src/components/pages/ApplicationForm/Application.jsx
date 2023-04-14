// import React, { useEffect, useState } from "react";
// import "./Application.css";
// import Footer from "../Footer/Footer";
// //import Navbarforapp from "../Home/Navbarforapp";
// import Axios from "axios";
// //import {Link } from "react-router-dom";
// import Navbarforapp from "../Home/Navbarforapp";




// const Application = () => {
//   const [modules, setModules] = useState([]);
//   const [studentType, setStudentType] = useState([]);
  
  
//   const submitHandler = (event) => {
//     // event.preventDefault();
//     let userId = localStorage.getItem('id');
    

//     // var attributes = {
//     //   adhaarCard: event.target.adhaarCard.value,
//     //   branch: event.target.branch.value,
//     //   collegeEmail: event.target.collegeEmail.value,
//     //   contactNumber: event.target.contactNumber.value,
//     //   email: event.target.email.value,
//     //   name: event.target.name.value,
//     //   passoutYear: event.target.passoutYear.value,
//     //   sapModule: event.target.sapModule.value,
//     //   specialization: event.target.specialization.value,
//     //   studentType: event.target.studentType.value,
//     //   applicationFromStatus: "initial",
//     //   userId: userId
//     // }
//     var attributes = {
//       adhaarCard: event.target.elements.adhaarCard.value,
//       branch: event.target.elements.branch.value,
//       collegeEmail: event.target.elements.collegeEmail.value,
//       contactNumber: event.target.elements.contactNumber.value,
//       email: event.target.elements.email.value,
//       name: event.target.elements.name.value,
//       passoutYear: event.target.elements.passoutYear.value,
//       sapModule: event.target.elements.sapModule.value,
//       specialization: event.target.elements.specialization.value,
//       studentType: event.target.elements.studentType.value,
//       applicationFromStatus: "initial",
//       userId: userId
//     }

//     if (attributes.adhaarCard !== "" &&
//       attributes.branch !== "" &&
//       attributes.collegeEmail !== "" &&
//       attributes.contactNumber !== null &&
//       attributes.email !== "" &&
//       attributes.name !== "" &&
//       attributes.passoutYear !== "" &&
//       attributes.sapModule !== "" &&
//       attributes.specialization !== "" &&
//       attributes.studentType !== "") {


//       Axios.post("http://localhost:9190/api/applicationForm", attributes)
//         .then(response => {
//           console.log(response);
//           console.log("api is working");
//           window.location.href = "/pending"

//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       alert("Invalid");
//     }
//   };


//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         const res = await Axios.get("http://localhost:9190/getallmodule?status=active");
//         console.log(res);
//         setModules(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     const fetchStudentType = async () => {
//       try {
//         const response = await Axios.get("http://localhost:9190/getallfeesstructure?status=active");
//         console.log(response.data);
//         setStudentType(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     let isMounted = true;
//     if (isMounted) {
//       fetchModules();
//       fetchStudentType();
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, [])

//   // function submit(){
//   //   this.history.push("/pending")
//   // }

//   console.log(studentType[0]?.studentType);
//   // modules.map((i)=>console.log(i))
//   studentType.forEach(element => {
//     console.log(element);
//   });

//   return (
//     <div>
//       <Navbarforapp />
//       <form
//         name="sendApplication"
//         id="applicationFrom"
//         onSubmit={submitHandler}
//       >
//         <div className="app-con">
//           <div className="app-con-from">
//             <h1 className="center ">SAP APPLICATION</h1>
//             <div className="app-content">
//               <input
//                 type="text"
//                 placeholder="Enter Adhar Card"
//                 id="adhaarCard"
//                 name="adhaarCard"
//                 required
//               />
//               <input type="text" placeholder="Enter branch" id="branch" />
//             </div>
//             <div className="app-content">
//               <input
//                 type="text"
//                 placeholder="College Email"
//                 id="collegeEmail"
//                 name="collegeEmail"
//                 required

//               />
//               <input
//                 type="text"
//                 placeholder="Enter contact Number"
//                 id="contactNumber"
//                 name="contactNumbe"
//                 required

//               />
//             </div>
//             <div className="app-content">
//               <input type="text" placeholder="Enter your Email" id="email"
//               name="email" />
//               <input type="text" placeholder="Enter your Name" id="name" 
//                 name="name"
//               />
//             </div>
//             <div className="app-content">
//               <input
//                 type="text"
//                 placeholder="Enter year of Passing out"
//                 id="passoutYear"
//                 name="passoutYear"
//                 required

//               />

//               <select>
//               <option value="">Select Your Module</option>
//                 {
//                   modules.length > 0 ? modules?.map((i) => {
//                     return <option value={i.moduleShortName} key={i.id}>{i.moduleShortName}</option>
//                   }) : <option value="">loading...</option>
//                 }

//               </select>
//             </div>
//             <div className="app-content">
//               <input
//                 type="text"
//                 placeholder="Enter your specialization"
//                 id="specialization"
//                 name="specialization"
//                 required

//               />
//               <select>
//               <option value="">Select Student Type</option>
//                 {
//                   studentType.length > 0 ? studentType?.map((i) => {
//                     return <option value={i.studentType} key={i.id}>{i.studentType}</option>
//                   }) : <option value="">loading...</option>
//                 }

//               </select>
//             </div>

//             <button className="btn-app" onClick={() => submitHandler()} >
//               Submit
//             </button>
//             {/* <p>{modules}</p> */}
//           </div>
//         </div>
//       </form>
//       <Footer />
//     </div>
//   );
// };

// export default Application;








