
import React, { useState, useEffect } from 'react';

function ContactUsTable() {
  const [contactUsData, setContactUsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9190/api/auth/getcontactus')
      .then(response => response.json())
      .then(data => setContactUsData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>mobileNumber</th>
          <th>Module</th>
        </tr>
      </thead>
      <tbody>
        {contactUsData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.mobileNumber}</td>
            <td>{row.module}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactUsTable;

