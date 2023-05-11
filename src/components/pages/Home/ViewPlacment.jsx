import React, { useEffect } from "react";
import axios from 'axios';
import "./ViewPlacement.css";
import { BASE_URL } from "../../../services/Globalvalues";
import { useState } from "react";
// import AOS from 'aos';
// // import 'aos/dist/aos.css';

const Placment = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  // const sortedData = data.sort((a, b) => b.packages - a.packages);
  // const top4Data = sortedData.slice(0, 4);
  // const datasrc = top4Data.map((ele) => ele.studentfilename)
  // const results = [];
      
  // for (const value of datasrc) {
  //     const fileimg = "" + value;
  //     axios.get(BASE_URL + `getplacementimage/${fileimg}`, {
  //       responseType: "blob",
  //     }).then((response) => {
  //       const imageUrl = URL.createObjectURL(response.data);
  //     results.push(imageUrl);
  //   });}
  
    useEffect(() => {
      const datasrc = data
        .sort((a, b) => b.packages - a.packages)
        .slice(0, 4)
        .map((ele) => ele.studentfilename);
  
      const promises = datasrc.map((value) => {
        const fileimg = "" + value;
        return axios.get(BASE_URL + `getplacementimage/${fileimg}`, {
          responseType: "blob",
        }).then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          return imageUrl;
        });
      });
  
      Promise.all(promises).then((results) => {
        setResults(results);
      });
    }, [data]);

  useEffect(() => {
    axios.get(BASE_URL + "getAllPlacement")
      .then(response => setData(response.data));
  }, []);
  return (
    <div>
      <h1 className="center-p">Placement</h1>
      <div className="main-Placement">
      {/* {top4Data.map((item, index) => {
      return (
        <div data-aos="fade-right"  data-aos-delay="100" key={item.id}>
          <div className="con-p">
            <img src={results[index]} className="my-pic" alt=""  />
            <h2>{item.name}</h2>
            <h3>{item.companyname}</h3>
            <h3>{item.module}</h3>
            <h3>{item.packages} LPA</h3>
          </div>
        </div>)})} */}
        {results.map((imageUrl, index) => {
          const item = data[index];
          return (
            <div data-aos="fade-right" data-aos-delay="100" key={item.id}>
              <div className="con-p">
                <img src={imageUrl} className="my-pic" alt="" />
                <h2>{item.name}</h2>
                <h3>{item.companyname}</h3>
                <h3>{item.module}</h3>
                <h3>{item.packages} LPA</h3>
              </div>
            </div>
          );
        })}
        
      </div>
      <p className="center-p">
        {" "}
        <a href="/seemore" >see more</a>
      </p>
    </div>
  );
};

export default Placment;
