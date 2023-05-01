import React, { useEffect } from 'react';
import Modal from '../../Modal';
import NewSidebar from '../../../../Navbar/Navbar';
import { useState } from 'react';
import Axios from 'axios';
import { BASE_URL } from '../../../../../services/Globalvalues';
//import axios from 'axios';

const Getreceipt = () => {
  const [imgsrc, setimgsrc] = useState('')
  const [Modalverify, setModalverify] = useState(false);
  const ID = parseInt(localStorage.getItem('id'));
  const [Data,setData]= useState([]);
  const handleverify = (ele) => {
    const file = ele.filename;
    Axios.get(BASE_URL + `getfeesreceipt/${file}`, { responseType: 'blob' }).then((response)=>{
      const imageUrl = URL.createObjectURL(response.data);
      setimgsrc(imageUrl)
    })
    setModalverify(true)
  }
  const handleCancel = () => {
    setModalverify(false)
  }
  
    useEffect(() => {
      (async () => {
             try {
              const { data } = await Axios.get(BASE_URL + 'getReceiptverification');
               setData(data);
              //  console.log(data);
             } catch (error) {
               console.log(error);
             }
           })();
      return () => sessionStorage.setItem('sidebar',JSON.stringify(false));
        },[ID]);
    return (<>
        <NewSidebar />
        <div
        className={
          sessionStorage.getItem("sidebar") === "true"
            ? "table-nav vform"
            : "table-nav"
        }
        >
        <table style={{width:"100%", marginTop:'20px'}}>
          <thead>
            <tr className="main-table top-col-table">
              <th>Student_id</th>
              <th>Installment No.</th>
              <th>Amount of Installment</th>
              <th>Total No.of Installment</th>
              <th>Total Fees</th>
              <th>Status of Verification</th>
              <th>Verify Fee Receipt Image</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {Data
              .map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    <td >
                      {ele.userId}
                    </td>
                    <td >
                      {ele.installment}
                    </td>
                    <td >
                      {ele.installmentAmount}
                    </td>
                    <td >
                      {ele.noOfInstallment}
                    </td>
                    <td >
                      {ele.totalFees}
                    </td>
                    <td >
                      {ele.recieptverifyStatus}
                    </td>
                    <td >
                        <button onClick={()=>handleverify(ele)}>Check receipt</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
        
        {Modalverify && <Modal>
          <div>
            <img src={imgsrc} alt='Wrongpath' style={{height:'500px',width:'500px'}}></img>
            <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      
                    }}
                  >
                    <button
                      className="btn-md"
                      // onClick={handleVerify}
                      style={{ marginRight: "100px", marginTop:'10px',height:'25px',
                      width:'50px' }}
                    >
                      Verify
                    </button>
                    <button onClick={handleCancel} style={{ marginTop:'10px',height:'25px',width:'50px'}}>Cancel</button>
                  </div>
          </div>
        </Modal>

        }
    </>)
}

export default Getreceipt;