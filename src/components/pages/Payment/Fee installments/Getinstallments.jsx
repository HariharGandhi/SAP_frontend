import React, { useEffect } from 'react';
import Paymentapi from '../../../../services/Paymentapi';
import NewSidebar from '../../../Navbar/Navbar';
import { useState } from 'react';

const Getinstallments = () => {

  const ID = parseInt(localStorage.getItem('id'));
  const [Data,setData]= useState([])
    useEffect(() => {
        (async () => {
            try {
               const { data } = await Paymentapi.getinstallment(ID);
              setData(data);
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          })();
          return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
        },);
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
              {/*<th>Student_id</th>*/}
              <th>Installment</th>
              <th>Amount of Installment</th>
              <th>No.of Installment</th>
              <th>Total Fees</th>
              <th>Status of payment</th>
              <th>Action</th>
              {/*<th>User_id</th>*/}
            </tr>
          </thead>
          <tbody>
            {Data
              .map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
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
                      {ele.installmentStatus}
                    </td>
                    <td >
                      <button
                        style={{ marginRight: "5px" }}
                        //onClick={() => viewQueryModal(ele)}
                      >
                        Pay now
                      </button>
                      {"    "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
        
    </>)
}

export default Getinstallments;