import React from 'react'
import Navbar from '../../../Home/Navbarforhome'
import "./Resume.css"
import { Link } from "react-router-dom";
import Footer from '../../../Footer/Footer';

function Resume() {
  return (
    <div>
        <div className='resume-nav'>
            <h3>SANJIVANI
                <span className='color-change'>SAP</span>
            </h3>
        </div>
    <div className="resume">
        <div className="left-resume">
            <h1>Build a professional resume for free</h1>
            <p>Create your resume easily with our free builder and professional templates.</p>
            <button>
                <a href='https://www.resume.com/resume/builder/'>Create My Resume</a>
            </button>
        </div>
        <div className="right-resume">
            <img src="https://www.resume.com/static/fb4669c69e1a8f8a16eb0204c1535713/36490/first-screen.webp" alt="" />
        </div>

    </div>
    <Footer/>
    </div>
  )
}

export default Resume