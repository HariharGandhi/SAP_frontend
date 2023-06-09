
import React, { useEffect } from 'react'
import './ContactForm.css'
import {ACTIVE, BASE_URL} from '../../../../services/Globalvalues'
import NotificationPlacement from '../../../../services/NotificationPlacementapi'


const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const [formSent, setFormSent] = React.useState(false)
  const [modules,setmodules] = React.useState([]);
  const [nfield,setnfield] = React.useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const StatuS = ACTIVE;
    const { name, email, mobileNumber, module, } = e.target.elements
    if (name.value === "" || email.value === "" || mobileNumber.value === "" || module.value === "") {
      setnfield(true)
      setTimeout(() => {
        setnfield(false)
      }, 2000);
      setFormStatus('Send')
    }
    else {
      setnfield(false)
    let contactForm = {
      name: name.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
      module: module.value,
      status: StatuS
    }
    if (nfield === false){
    fetch(BASE_URL + 'api/auth/postcontactus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactForm)
    })
    .then(response => response.json())
    .then(data => {
     
      setFormStatus('Sent')
      setFormSent(true)
    })
    .catch(error => {
      console.error(error)
      setFormStatus('Error')
    })}}
  }
  useEffect(() => {
    if (formSent) {
      const timerId = setTimeout(() => {
        redirectToPage();
      }, 3000);
      return () => clearTimeout(timerId);
    }
    (async () => {
      try {
        NotificationPlacement.getmodules(ACTIVE).then((res) => {
          setmodules(res.data);
        });
        
      } catch (error) {
      //  console.log(error);
      }
    })();
  }, [formSent]);
  const redirectToPage = () => {
    window.location.href = "/applicationprocces"
  }

  return (
    <>
    {formSent && <div className="w3-panel w3-green"><div className='subtext'>
  <h1>Form submitted</h1>
  <h2>Our coordinator will contact you soon.</h2>
  <h2>Till that We'll guide you through the application process.</h2></div>
</div> }
    {!formSent && 
    <div className ='ctcform-container' >
      <h1 className='center-p'>Contact Us</h1>
      <div className='ctcform-container'>
      <div className='image-container' style={{alignContent:'center'}}>
        <img src={process.env.PUBLIC_URL + '/Photo/SapSanjivani.jpeg'} alt="#" style={{marginLeft:'20px', height:'350px',border:'1px solid'}} className='image'/>
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
          {modules.map(ele=>(
                        <option value={ele.moduleName} key={ele.id}>{ele.moduleName}</option>
                    ))}
        </select>
        
      </label>
      <button type="submit" style={{width:'150px'}}>{formStatus}</button>
      {nfield && <p>All fields are mandatory to fill</p>}
    </form></div>
    </div>}
    </>
  )
}

export default ContactForm


