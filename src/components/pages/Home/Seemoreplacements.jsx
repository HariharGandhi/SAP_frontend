import React from "react";
import "./ViewPlacement.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbarforhome";
import Footer from "../Footer/Footer";

import { BASE_URL } from "../../../services/Globalvalues";
import axios from "axios";

const Seemoreplacements = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= users.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  // useEffect(() => {

  //   const promises = users.map((value) => {
  //     const fileimg = "" + value;
  //     return axios.get(BASE_URL + `getplacementimage/${fileimg}`, {
  //       responseType: "blob",
  //     }).then((response) => {
  //       const imageUrl = URL.createObjectURL(response.data);
  //       return imageUrl;
  //     });
  //   });

  //   Promise.all(promises).then((results) => {
  //     setResults(results);
  //   });
  // }, [users,results]);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const res = await fetch(BASE_URL + "getAllPlacement");
  //     setUsers(await res.json());
  //     // console.log(await users.body)
  //   };

  //   getUsers();
  // }, [users]);

  useEffect(() => {
    const datasrc = users.map((ele) => ele.studentfilename);

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
  }, [users]);

useEffect(() => {
  axios.get(BASE_URL + "getAllPlacement")
    .then(response => setUsers(response.data));
}, []);
  return (
    <div>
      <Navbar />
      <h1 className="center-p">Placement</h1>

      <div>
        <div className="main-Placement">
          {/* {users.slice(page * 15 - 15, page * 15).map((cur) => {
            return (
              <div
                className="con-p"
                data-aos="fade-right"
                data-aos-delay="50"
                key={cur.id}
              >
                
                <h2>{cur.name}</h2>
                <h3>{cur.companyname}</h3>
                <h3>{cur.module}</h3>
                <h3>{cur.packages} LPA</h3>
              </div>
            );
          })} */}
          {results.map((imageUrl, index) => {
          const item = users[index];
          return (
            <div data-aos="fade-right" data-aos-delay="100" key={item.id}>
              <div className="con-p">
                <img src={imageUrl} className="my-pic" alt="" />
                <h2>{item.name}</h2>
                <h3>{item.companyname}</h3>
                <h3>{item.packages} LPA</h3>
              </div>
            </div>
          );
        })}
        
        </div>
        {users.length > 0 && (
          <div className="pagination">
            <span
              className={page > 1 ? "" : "pagination__disable"}
              onClick={() => selectPageHandler(page - 1)}
              role="img"
              aria-label="left arrow"
            >
              ◀
            </span>
            {[...Array(Math.ceil(users.length / 10))].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                  key={i}
                >
                  {" "}
                  {i + 1}{" "}
                </span>
              );
            })}

            <span
              className={page < users.length / 10 ? "" : "pagination__disable"}
              onClick={() => selectPageHandler(page + 1)}
              role="img"
              aria-label="right Arrow"
              style={{ marginRight: "150px" }}
            >
              ▶
            </span>
          </div>
        )}
      </div>
      <a
        style={{
          marginRight: "10px",
          marginLeft: "90%",
          marginBottom: "50px",
          color: "black",
          textDecorationLine: "underline",
          cursor: "pointer",
        }}
        href="/home"
      >
        {" "}
        Back to Home{" "}
      </a>
      <Footer />
    </div>
  );
};

export default Seemoreplacements;
