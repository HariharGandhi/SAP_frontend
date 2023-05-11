import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationPlacementapi from "../../../../../services/NotificationPlacementapi";
import NewSidebar from "../../../../Navbar/Navbar";
import "./GetPlacement.css";
import { CSVLink } from "react-csv";
import { BASE_URL } from "../../../../../services/Globalvalues";
import Axios from "axios";
import Modal from "../../Modal";
const Getplace = () => {
  const [ispackaged, setIspackaged] = useState(false);
  const [isyear, setIsyear] = useState(false);
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [fname, setfname] = useState("")
  const [src,setsrc] = useState("");
  const [placementmodal, setplacementmodal]=useState(false);
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
      setData([...Data].sort((a, b) => a.packages - b.packages));
    } else {
      setData(
        [...Data].sort((a, b) => (b.packages) - (a.packages))
      );
    }
  };
  const ViewImage = (ele) => {
    setfname(ele)
    Axios.get(BASE_URL + `getplacementimage/${fname}`, {
      responseType: "blob",
    }).then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setsrc(imageUrl);
      setplacementmodal(true)
    });
  }
  const handleCancelModal = ()=>{
    setplacementmodal(false)

  }
  
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
    { label: "Package", key: "packages" },
    { label: "Image", key: "imageUrl" },
    { label: "Name", key: "name" },
    { label: "Company", key: "companyname" },
    { label: "Module", key: "module" },
    { label: "Year of Placement", key: "placementYear" },
  ];
  useEffect(() => {
    (async () => {
      try {
        NotificationPlacementapi.getplacement().then((response) => {
          setData(response.data);
        });
      } catch (error) {
        // console.log("Error");
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
                style={{backgroundColor:"black",color:"white",borderRadius:"5px", width: "90px", marginLeft: "20px" }}
              >
                Clear
              </button>
              <CSVLink
                data={Data}
                headers={headers}
                filename={"placement Data.csv"}
                className="xlsbutton"
                style={{ marginTop: "5", marginLeft: "5" }}
              >
                {" "}
                Download in csv
              </CSVLink>
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
                  {ispackaged && (
                    <span
                      role="img"
                      aria-label="Up Arrow"
                      style={{ marginLeft: "5px" }}
                    >
                      ⬆
                    </span>
                  )}
                  {!ispackaged && (
                    <span
                      role="img"
                      aria-label="Down Arrow"
                      style={{ marginLeft: "5px" }}
                    >
                      ⬇
                    </span>
                  )}
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
                  {isyear && (
                    <span role="img" aria-label="Up Arrow">
                      ⬆
                    </span>
                  )}
                  {!isyear && (
                    <span role="img" aria-label="Down Arrow">
                      ⬇
                    </span>
                  )}
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
                })
                .slice(page * 15 - 15, page * 15)
                .map((ele) => {
                  return (
                    <tr key={ele.id} className="main-table">
                      {/* <td>{ele.id}</td> */}
                      <td>
                        {ele.packages}
                        {" lpa"}
                      </td>
                      <td>
                        <button onClick={()=>ViewImage(ele.studentfilename)}>View Image</button>
                      </td>
                      <td>{ele.name}</td>
                      <td>{ele.companyname}</td>
                      <td>{ele.module}</td>
                      <td>{ele.placementYear}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>{" "}
      {Data.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
            role="img"
            aria-label="left arrow"
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
          
          {placementmodal && 
        
          <Modal>
          <div className="Receiptget">
            <img
              src={src}
              alt="Wrongpath"
              style={{ height: "500px", width: "500px" }}
            ></img>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={()=>handleCancelModal()}
                style={{backgroundColor:"black",color:"white",borderRadius:"5px", marginTop: "10px", height: "25px", width: "50px" }}
              >
                Cancel
              </button>
            </div>
          </div>
          </Modal>
          }

          <span
            className={page < Data.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
            role="img"
            aria-label="right Arrow"
            style={{ marginRight: "150px" }}
          >
            ▶
          </span>
          <button className="place-button">
            <Link to="/postplacement" className="place-link">
              Add Placement{" "}
            </Link>
          </button>
        </div>
      )}
      {/* <div >
          <button className="place-button" Link to="/postplacement">Add Placement</button>
      </div> */}
    </>
  );
};
export default Getplace;
