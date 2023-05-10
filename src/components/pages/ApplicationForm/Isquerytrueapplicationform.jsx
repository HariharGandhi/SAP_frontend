import React from 'react';
import { useHistory } from 'react-router-dom';
import "./isquerytrue.css";
import Navbarforapp from '../Home/Navbarforapp';
import Axios from "axios";
import { BASE_URL } from '../../../services/Globalvalues';

function Isquerytrue() {
  const history = useHistory();


  const handleEditClick = async () => {
    try {
      const response = await Axios.get(BASE_URL+"api/getDetailsByUserid/?UserId=15");

      history.push({
        pathname: '/application',
          state: response.data // your data array of objects
      })
    } catch (error) {
      //console.log(error);
    }
  }

  return (
    <>
      <Navbarforapp />
      <div className='isquery'>
        <h1>There is a query in your application form. You need to edit this form or contact the admin.</h1>
        <p>Click the Edit button to edit the form.</p>
        <button onClick={handleEditClick}>Edit form</button>

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