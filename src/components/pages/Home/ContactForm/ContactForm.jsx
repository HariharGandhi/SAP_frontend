
import React from 'react'
import './ContactForm.css'


const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, mobileNumber, module } = e.target.elements
    let contactForm = {
      name: name.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
      module: module.value,
    }

    fetch('http://localhost:9190/api/auth/postcontactus', {
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
    <form onSubmit={handleSubmit} id="contactform">
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
      mobileNumber
        <input type="text" name="mobileNumber" />
      </label>
      <label>
        Module:
        <select name="module">
          <option value="Module 1">Module 1</option>
          <option value="Module 2">Module 2</option>
          <option value="Module 3">Module 3</option>
        </select>
      </label>
      <button type="submit">{formStatus}</button>
    </form>
  )
}






































// const ContactForm = () => {
//   const [formStatus, setFormStatus] = React.useState('Send')
//   const onSubmit = (e) => {
//     e.preventDefault()
//     setFormStatus('Submitting...')
//     const { name, email,number, module } = e.target.elements
//     let conFom = {
//       name: name.value,
//       email: email.value,
//       number:number.value,
//       module: module.value,
//     }
//     console.log(conFom)
//   }
//   return (
//     <div className="container mt-5">
//       <h2 className="mb-3">For Enquiry Please Fill This Form</h2>
//       <form onSubmit={onSubmit}>
//         <div className="mb-3">
//           <label className="form-label" htmlFor="name">
//             Name
//           </label>
//           <input className="form-control" type="text" id="name" required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label" htmlFor="email">
//             Email
//           </label>
//           <input className="form-control" type="email" id="email" required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label" htmlFor="mobileno">
//             MobileNo
//           </label>
//           <input className="form-control" type="Number" id="number" required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label" htmlFor="module">
//             Module
//           </label>
//           <input className="form-control" type="Text" id="module" required />
//         </div>
//         <button className="btn btn-danger" type="submit">
//           {formStatus}
//         </button>
//       </form>
//     </div>
//   )
// }
export default ContactForm


