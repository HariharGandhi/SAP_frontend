import React, { Component } from "react";
import './homecomponent.css';
import './../../../App.css';
import ViewDomain from "./ViewDomain";
import Placment from "./ViewPlacment";
import NewBody from "./NewBody";
import Footer from "../Footer/Footer";
import SAPvideo from "./../SAPvideo/SAPvideo";
import Navbarforhome from "./Navbarforhome";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  render() {


    return (
      <div>
        
        <Navbarforhome/>

        {/* <div className="row">
            <div className="col-6">
                
            </div>
        </div> */}


      <div className="container">
        {/* <header className="jumbotron">
         
        </header>
      
        <Body /> */}
        <NewBody/>
        <hr data-aos="fade-right" data-aos-delay="120" data-aos-offset="120"/>
        <SAPvideo/>
        <hr data-aos="fade-right" data-aos-delay="120" data-aos-offset="120"/>

        <ViewDomain />
        <hr data-aos="fade-right" data-aos-delay="120" data-aos-offset="120"/>
      </div>
      <Placment/>

      <Footer/>

      {/* <Footer/> */}

      </div>
    );
  }
}
