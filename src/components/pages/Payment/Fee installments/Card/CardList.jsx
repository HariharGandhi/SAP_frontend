import React from 'react';
import Card from './Card';

const CardList = ({ data }) => {
  return (
    <div className="card-list">
      {data.map(item => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
}

export default CardList;
