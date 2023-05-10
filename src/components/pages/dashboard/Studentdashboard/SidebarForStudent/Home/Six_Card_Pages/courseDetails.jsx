import React, { useEffect } from 'react';
import NewSidebar from '../../../../../../Navbar/Navbar';
import ViewDomain from '../../../../../Home/ViewDomain';

const CourseDetails = () => {
  useEffect(() => {
    return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
});
  return (<>
  <NewSidebar />
    <div className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }>

    <div className=' content'>
        <ViewDomain style={{marginTop:'20px'}}/>
     
   
     </div>
    </div>
    </>
  );
}

export default CourseDetails;
