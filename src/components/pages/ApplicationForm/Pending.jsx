import React, {  } from 'react'
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
        <h3>Pending</h3>
        <h5>if you have any query weite here</h5>
        <input className='Pending' type="text" />
    </div>
    
  )
}
