import React, { useEffect } from "react";
import axios from 'axios';
import "./ViewPlacement.css";
import { BASE_URL } from "../../../services/Globalvalues";
import { useState } from "react";
// import AOS from 'aos';
// // import 'aos/dist/aos.css';

const Placment = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(BASE_URL + "getAllPlacement")
      .then(response => setData(response.data));
  }, []);
  const sortedData = data.sort((a, b) => b.packages - a.packages);
  const top4Data = sortedData.slice(0, 4);
  return (
    <div>
      <h1 className="center-p">Placement</h1>
      <div className="main-Placement">
      {top4Data.map((item) => {
      return (
        <div data-aos="fade-right"  data-aos-delay="100" key={item.id}>
          <div className="con-p">
            {/* <img src="images/Profilepic.png" className="my-pic" alt="" /> */}
            <h2>{item.name}</h2>
            <h3>{item.companyname}</h3>
            <h3>{item.module}</h3>
            <h3>{item.packages} LPA</h3>
          </div>
        </div>)})}
        
      </div>
      <p className="center-p">
        {" "}
        <a href="/seemore" >see more</a>
      </p>
    </div>
  );
};

export default Placment;
