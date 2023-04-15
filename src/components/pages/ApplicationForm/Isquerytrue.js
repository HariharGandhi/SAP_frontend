// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import "./isquerytrue.css";
// import Navbarforapp from '../Home/Navbarforapp';
// import Axios from "axios";

// function Isquerytrue() {
//   const history = useHistory();


//   const handleEditClick = async () => {
//     try {
//       const response = await Axios.get("http://localhost:9190/api/getDetailsByUserid/?UserId=15");
//       console.log(response.data);
//       history.push({
//         pathname: '/application',
//           state: response.data // your data array of objects
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <Navbarforapp />
//       <div className='isquery'>
//         <h1>There is a query in your application form. You need to edit this form or contact the admin.</h1>
//         <p>Click the Edit button to edit the form.</p>
//         <button onClick={handleEditClick}>Edit form</button>

//         <div>
//           <p>Contact Details Of Admin <br />
//             Sayli Salakar mam <br />
//             from Sanjivani College of Engineering <br />
//             Contact No: 9766951775 <br />
//             Kopergoan
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Isquerytrue;



import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./isquerytrue.css";
import Navbarforapp from '../Home/Navbarforapp';
import Axios from "axios";

function Isquerytrue() {
  const history = useHistory();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    let ApplicationId = Number(localStorage.getItem('id'));
    async function fetchData() {
      try {
        const response = await Axios.get(`http://localhost:9190/applicationFrom/getapplicationformbyapplicationId/${ApplicationId}`);
    
        console.log(response.data);
        console.log("sachin");
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleEditClick = () => {
    history.push({
      pathname: '/application',
      state: formData // your data object
    })
  }

  return (
    <>
      <Navbarforapp />
      <div className='isquery'>
        <h1>There is a query in your application form. You need to edit this form or contact the admin.</h1>
        <p>Click the Edit button to edit the form.</p>
        <button onClick={handleEditClick}>Edit form</button>

        {formData && (
          <div>
            <h2>Problem in you Form</h2>
            <p>QueryTitle: {formData.queryTitle}</p>
            <p>QueryDesc: {formData.queryDesc}</p>
           
          </div>
        )}

        <div>
          <p>Contact Details Of Admin <br />
            Sayli Salakar mam <br />
            from Sanjivani College of Engineering <br />
            Contact No: 9766951775 <br />
            Kopergoan
          </p>
        </div>
      </div>
    </>
  );
}

export default Isquerytrue;
