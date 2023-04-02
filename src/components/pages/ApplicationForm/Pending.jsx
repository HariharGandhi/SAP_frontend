import React, {  } from 'react'
import NewSidebar from '../../Navbar/Navbar'
import "./Application.css"


export default function Pending() {
  

  // GET /api/getapplicationformStatus/{UserId}
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:9190/api/getapplicationformStatus/${UserId}`,{
          
  //         }
  //       );
  //       setUserId(data);
  //       //setSid(data.records.student_id);
  //       console.log(data);
  //     } catch (error) {
  //       console.log("Error");
  //     }
  //   })();
  // },[]);
    
  return (
    <div>
        <NewSidebar />
        <h3> Pending ...</h3>
        <h4>Your Form Is Under Verification </h4>
        <h4>Please </h4>

        
    </div>
    
  )
}
