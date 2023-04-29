import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../Navbar/Navbar";
import "./GetPlacement.css";
import { CSVLink } from "react-csv";
const Getplace = () => {
  const [ispackaged, setIspackaged] = useState(false);
  const [isyear, setIsyear] = useState(false);
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchmod, setsearchmod] = useState("");
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Data.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  const sortPackage = (Data, setData) => {
    setIspackaged((prev) => !prev);
    if (!ispackaged) {
      setData(
        [...Data].sort(
          (a, b) =>
            Number(a.packages) -
            Number(b.packages)
        )
      );
    } else {
      setData(
        [...Data].sort(
          (a, b) =>
            Number(b.packages) -
            Number(a.packages)
        )
      );
    }
  };
  const sortyear = (Data, setData) => {
    setIsyear((prev) => !prev);
    if (!isyear) {
      setData(
        [...Data].sort(
          (a, b) => Number(a.placementYear) - Number(b.placementYear)
        )
      );
    } else {
      setData(
        [...Data].sort(
          (a, b) => Number(b.placementYear) - Number(a.placementYear)
        )
      );
    }
  };
  const clearsearch = () => {
    setSearch("");
    setsearchmod("");
  };
  const headers = [
    {label : "Package", key  : "packages"},
    {label:"Image", key:"imageUrl"},
    {label:"Name", key:"name"},
    {label:"Company", key:"companyname"},
    {label:"Module", key:"module"},
    {label:"Year of Placement", key:"placementYear"},
  ]
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getplacement().then((response) => {
          console.log(response.data);
          setData(response.data);
        });
      } catch (error) {
        console.log("Error");
      }
    })();
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, []);

  return (
    <>
      <NewSidebar />
      
      <div
        className="getplace"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className={
            sessionStorage.getItem("sidebar") === "true"
              ? "table-nav vform"
              : "table-nav"
          }
          style={{ marginTop: "10px" }}
        >
          <div className="container form-group " id="tab">
          <label>
            Student Name :
            <input
              className="table-search"
              type="text"
              value={search}
              placeholder="Enter Name to search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label>
            Module :
            <input
              className="table-search"
              type="text"
              value={searchmod}
              placeholder="Enter module to search"
              onChange={(e) => setsearchmod(e.target.value)}
              style={{ marginLeft: "60px" }}
            />
            <button
              onClick={() => clearsearch()}
              style={{ width: "90px", marginLeft: "20px" }}
            >
              Clear
            </button>
            
          </label>
        </div>
          <table style={{ width: "100%" }} id="placetab">
            <thead>
              <tr className="main-table top-col-table">
                {/*<th>Student_id</th>*/}
                {/* <th>Id</th> */}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => sortPackage(Data, setData)}
                >
                  Package Recieved
                  {ispackaged && <span role="img" aria-label="Up Arrow" style={{marginLeft:"5px"}}>⬆</span>}
                  {!ispackaged && <span role="img" aria-label="Down Arrow" style={{marginLeft:"5px"}}>⬇</span>}
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Company</th>
                <th>Module</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => sortyear(Data, setData)}
                >
                  Year of Placement
                  {isyear && <span role="img" aria-label="Up Arrow">⬆</span>}
                  {!isyear && <span role="img" aria-label="Down Arrow">⬇</span>}
                </th>
                {/*<th>User_id</th>*/}
              </tr>
            </thead>
            <tbody>
              {Data.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .filter((item) => {
                return searchmod.toLowerCase() === ""
                  ? item
                  : item.module.toLowerCase().includes(searchmod);
              }).slice(page * 15 - 15, page * 15).map((ele) => {
                return (
                  <tr key={ele.id} className="main-table">
                    {/* <td>{ele.id}</td> */}
                    <td>
                      {ele.packages}
                      {" lpa"}
                    </td>
                    <td>{ele.imageUrl}</td>
                    <td>{ele.name}</td>
                    <td>{ele.companyname}</td>
                    <td>{ele.module}</td>
                    <td>{ele.placementYear}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CSVLink data={Data} headers={headers} filename={"placement Data.csv"} className="xlsbutton">
        Download in csv
      </CSVLink>
        </div>
      </div>{" "}
      
      {Data.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
            role="img" aria-label="left arrow"
          >
            ◀
          </span>
          {[...Array(Math.ceil(Data.length / 10))].map((_, i) => {
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
            className={page < Data.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
            role="img" aria-label="right Arrow" 
            style={{marginRight:"150px"}}
          >
            ▶
          </span>
          <button className="place-button"><Link to="/postplacement">Add Placement </Link></button>
        </div>
      )}
      {/* <div >
          <button className="place-button" Link to="/postplacement">Add Placement</button>
      </div> */}
    </>
  );
};
export default Getplace;
