import React from 'react';
import NewSidebar from '../../../../../../Navbar/Navbar';

const courseDetails = () => {
  return (<>
  <NewSidebar />
    <div className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }>

    <div className=' content'>

     
    <div className='item-course'>
          sachin
          <div className='item-box'>
            loresdfsdfdsgfdg

            fdgdgfdfgfdg
            dfg
            fdgdgfdfgfdgfdg
            fdgdgfdfgfdgfdggdf
            gfg
            dfgfdg
            fdgdgfdfgfdgfdggdfgfdg
            fdgdgfdfgfdgfdggdfgfdgdfg
            dfggdf
            gdfg
            dfgfdg
            dfgfdgfdg
            dfg
          </div>
    </div><div className='item-course'>
          sachin
          <div className='item-box'>
            loresdfsdfdsgfdg

            fdgdgfdfgfdg
            dfg
            fdgdgfdfgfdgfdg
            fdgdgfdfgfdgfdggdf
            gfg
            dfgfdg
            fdgdgfdfgfdgfdggdfgfdg
            fdgdgfdfgfdgfdggdfgfdgdfg
            dfggdf
            gdfg
            dfgfdg
            dfgfdgfdg
            dfg
          </div>
    </div><div className='item-course'>
          sachin
          <div className='item-box'>
            loresdfsdfdsgfdg

            fdgdgfdfgfdg
            dfg
            fdgdgfdfgfdgfdg
            fdgdgfdfgfdgfdggdf
            gfg
            dfgfdg
            fdgdgfdfgfdgfdggdfgfdg
            fdgdgfdfgfdgfdggdfgfdgdfg
            dfggdf
            gdfg
            dfgfdg
            dfgfdgfdg
            dfg
          </div>
    </div>
     </div>
    </div>
    </>
  );
}

export default courseDetails;
