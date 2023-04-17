
import React from 'react'
import './ContactForm.css'
import {BASE_URL} from '../../../../services/Globalvalues'


const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const StatuS = 'active'
    const { name, email, mobileNumber, module, } = e.target.elements
    let contactForm = {
      name: name.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
      module: module.value,
      status: StatuS
    }

    fetch(BASE_URL + 'api/auth/postcontactus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactForm)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setFormStatus('Sent')
    })
    .catch(error => {
      console.error(error)
      setFormStatus('Error')
    })
  }

  return (
    <div >
      <h1 className='center-p'>Contact Us</h1>
      <div className='ctcform-container'>
      <div className='image-container' style={{alignContent:'center'}}>
        <img src={process.env.PUBLIC_URL + '/images/PP.jpeg'} alt="#" style={{marginLeft:'20px'}} className='image'/>
      </div>
    <form onSubmit={handleSubmit} id="contactform" className='form-container'>
      <h3>Enter your Details</h3>
      <label>
        <h3>Name:</h3>
        <input type="text" name="name" />
      </label>
      <label>
      <h3>Email:</h3>
        <input type="email" name="email" />
      </label>
      <label>
      <h3>Contact Number: </h3>
        <input type="text" name="mobileNumber" />
      </label>
      <label>
      <h3> Module:</h3>
        <select name="module" style={{cursor:'pointer'}}>
          <option value="">Select Module</option>
          <option value="PP">PP</option>
          <option value="SD">SD</option>
          <option value="ABAP">ABAP</option>
          <option value="MM">MM</option>
          <option value="HR/HCM">HR/HCM</option>
          <option value="HR/HCM">HR/HCM</option>
        </select>
        
      </label>
      <button type="submit" style={{width:'150px'}}>{formStatus}</button>
    </form></div>
    </div>
  )
}

export default ContactForm

