import React, {  } from "react"; 
import "./Homenavbar.css"
export default function Navbarforhome() {
  return (
    // <nav className="nav" data-aos="fade-down" data-aos-delay="100" data-aos-offset="00">
    //   <ul>
    //     <div className="left-nav" style={{backgroundColor:"black"}}>
    //       <li>
    //         <a href="/" className="site-title">
    //           <h2>
    //             Sanjivani<span className="color-change">SAP</span>
    //             </h2>
    //         </a>
    //       </li>
          
    //     </div> 

    //     <div className="right-nav" >
    //       <li>
    //         <a href="/login">Login</a>
    //       </li>
    //       <li>
    //         <a href="/register">Register</a>
    //       </li>
    //     </div>
    //   </ul>
    // </nav>

    <nav className="nav" data-aos="fade-down" data-aos-delay="100" data-aos-offset="00">
  <div className="nav-left">
    <a href="/" className="site-title">
      <h2>Sanjivani<span className="color-change">SAP</span></h2>
    </a>
  </div>
  <div className="nav-right">
    <ul>
      <li>
        <a href="/login">Login</a>
      </li>
      <li>
        <a href="/register">Register</a>
      </li>
    </ul>
  </div>
</nav>

  );
}
