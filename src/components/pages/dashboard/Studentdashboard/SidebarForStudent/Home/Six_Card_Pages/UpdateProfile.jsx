import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../../../../../../services/Globalvalues';
// import NewSidebar from '../../../../../../Navbar/Navbar';



// // let studentId = localStorage.getItem('id');
// function  UpdateProfile ({ studentId }) {
//   const [studentData, setStudentData] = useState({});
  

//   useEffect(() => {

    
//     let studentId = Number(localStorage.getItem('id'));
//     async function fetchStudentData() {
    
//       const response = await fetch(BASE_URL + `api/getapplicationformbyid/${studentId}`);
//       const data = await response.json();
//       setStudentData(data);
//     }
//     console.log(studentId,"this is student id")
//     fetchStudentData();
//     return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
//   }, [studentId]);

//   return (<>
//   <NewSidebar/>
//     <div className={
//           sessionStorage.getItem("sidebar") === "true"
//             ? "student vform"
//             : "student"
//         }
// >
//       {Object.keys(studentData).length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <p>Student ID: {studentData.userId}</p>
//           <p>Name: {studentData.name}</p>
//           <p>Adhaar Card: {studentData.adhaarCard}</p>
//           <p>Contact Number: {studentData.contactNumber}</p>
//           <p>Email: {studentData.email}</p>
//           <p>Passout Year: {studentData.passoutYear}</p>
//           <p>SAP Module: {studentData.sapModule}</p>
//           <p>Specialization: {studentData.specialization}</p>
//           <p>Student Type: {studentData.studentType}</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

// export default UpdateProfile;



// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../../../../../../services/Globalvalues';
// import NewSidebar from '../../../../../../Navbar/Navbar';

// function UpdateProfile({ studentId }) {
//   const [studentData, setStudentData] = useState({});
//   const [formData, setFormData] = useState({});
//   const [adhaarCard, setadhaarCard] = useState();
//   const [applicationFromStatus, setapplicationFromStatus] = useState();
//   const [branch, setbranch] = useState();
//   const [collegeEmail, setcollegeEmail] = useState();
//   const [contactNumber, setcontactNumber] = useState();


//   const [email, setemail] = useState();
//   const [isQueryInApplication, setisQueryInApplication] = useState();
//   const [name, setname] = useState();
//   const [passoutYear, setpassoutYear] = useState();
//   const [sapModule, setsapModule] = useState();

//   const [specialization, setspecialization] = useState();

//   const [studentType, setstudentType] = useState();
//   const [uploadImage, setuploadImage] = useState();

  


  


//   useEffect(() => {
//     let studentId = Number(localStorage.getItem('id'));
//     async function fetchStudentData() {
//       const response = await fetch(BASE_URL + `api/getapplicationformbyid/${studentId}`);
//       const data = await response.json();
//       setStudentData(data);
//       setFormData(data);
//       console.log(data);
//     }

//     fetchStudentData();
//     sessionStorage.setItem('sidebar', JSON.stringify(false));
//   }, [studentId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     let userId = Number(localStorage.getItem('id'));
//     event.preventDefault();
//     try {

//      await axios.put(BASE_URL + `api/updateapplicationForm/${studentData.userId}`, {
//     formData
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.error("here"+error);
//       });
      


//       // const response = await fetch(BASE_URL + `api/updateapplicationForm/${studentData.userId}`, {
//       //   // mode:"no-cors",
//       //   method: 'PUT',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(formData),
//       // });
      

//       // const data = await response.json();
//       // setStudentData(data);
//       // setFormData(data);

//       console.log("done");
//     } catch (error) {
//       console.log("here"+formData.userId)
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <NewSidebar />
//       <div className={sessionStorage.getItem('sidebar') === 'true' ? 'student vform' : 'student'}>
//         {Object.keys(studentData).length === 0 ? (
//           <p>Loading...</p>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <label>
//               adhaarCard:
//               <input type="text" name="adhaarCard" value={formData.adhaarCard} onChange={handleInputChange} />
//             </label>
//             <label>
//             applicationFromStatus:
//               <input type="text" name="applicationFromStatus" value={formData.applicationFromStatus} onChange={handleInputChange} />
//             </label>
//             <label>
//                branch:
//               <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} />
//             </label>
//             <label>
//             collegeEmail :

//               <input type="text" name="collegeEmail" value={formData.collegeEmail} onChange={handleInputChange} />
//             </label>
//             <label>
//             contactNumber:

//               <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
//             </label>
//             <label>
//             email:
//               <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
//             </label>
//             <label>
//             isQueryInApplication :
//               <input type="text" name="isQueryInApplication" value={formData.isQueryInApplication} onChange={handleInputChange} />
//             </label>
//             <label>
//                name:
//               <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
//             </label>
//             <label>
//             passoutYear:
//               <input type="text" name="passoutYear" value={formData.passoutYear} onChange={handleInputChange} />
//             </label>
//             <label>
//             sapModule :
//               <input type="text" name="sapModule" value={formData.sapModule} onChange={handleInputChange} />
              
//             </label>
//             <label>
//             specialization :
//               <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} />
              
//             </label>
//             <label>
//             studentType :
//               <input type="text" name="studentType" value={formData.studentType} onChange={handleInputChange} />
              
//             </label>
//             <label>
//             uploadImage :
//               <input type="text" name="uploadImage" value={formData.uploadImage} onChange={handleInputChange} />
              
//             </label>
//             <button type="submit">Update</button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// }

// export default UpdateProfile;






import React, { useState, useEffect } from 'react';

import { BASE_URL } from '../../../../../../../services/Globalvalues';
import "./UpdateProfile.css"
import NewSidebar from '../../../../../../Navbar/Navbar';

function UpdateProfile({ studentId }) {
  const [studentData, setStudentData] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    let studentId = Number(localStorage.getItem('id'));
    async function fetchStudentData() {
      const response = await fetch(BASE_URL + `api/getapplicationformbyid/${studentId}`);
      const data = await response.json();
      setStudentData(data);
      setFormData(data);
    }

    fetchStudentData();
    sessionStorage.setItem('sidebar', JSON.stringify(false));
  }, [studentId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(BASE_URL + `api/updateapplicationForm/${formData.userId}`, formData);
      console.log(response);
      console.log("done");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NewSidebar />
      <div className={sessionStorage.getItem('sidebar') === 'true' ? 'student vform' : 'student'}>
        {Object.keys(studentData).length === 0 ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Adhaar Card:
              <input type="text" name="adhaarCard" value={formData.adhaarCard} onChange={handleInputChange} />
            </label>
            <label>
              Application Form Status:
              <input type="text" name="applicationFromStatus" value={formData.applicationFromStatus} onChange={handleInputChange} />
            </label>
            <label>
              Branch:
              <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} />
            </label>
            <label>
              College Email:
              <input type="text" name="collegeEmail" value={formData.collegeEmail} onChange={handleInputChange} />
            </label>
            <label>
              Contact Number:
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <label>
              Query in Application:
              <input type="text" name="isQueryInApplication" value={formData.isQueryInApplication} onChange={handleInputChange} />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
              Passout Year:
              <input type="text" name="passoutYear" value={formData.passoutYear} onChange={handleInputChange} />
            </label>
            <label>
              SAP Module:
              <input type="text" name="sapModule" value={formData.sapModule} onChange={handleInputChange} />
            </label>
            <label>
              Specialization:
              <input type="text" name="Specialization" value={formData.Specialization} onChange={handleInputChange} />
              </label>
            <button type="submit">Update</button>
         </form>
       )}
</div>
    </>
   );
 }

 export default UpdateProfile;

