import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card">
      <h6>Installment : {data.installment}</h6>
      <h6>No. of Installment : {data.noOfinstallment}</h6>
      <h6>Installment Amount : {data.installmentAmount}</h6>
      <h6>No. of Installment : {data.installmentStatus}</h6>
      <h6>No. of Installment : {data.totalFees}</h6>
    </div>
  );
}

export default Card;
