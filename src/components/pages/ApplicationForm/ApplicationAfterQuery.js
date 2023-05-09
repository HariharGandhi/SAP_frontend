import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationAfterQuery.css";
import { BASE_URL } from "../../../services/Globalvalues";
import Navbarforapp from "../Home/Navbarforapp";

function ApplicationAfterQuery() {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [extraData, setExtraData] = useState({});
  const ID = Number(localStorage.getItem("id"));
  useEffect(() => {
    axios
      .get(BASE_URL + `api/getDetailsByUserid/{UserId}`, {
        params: {
          UserId: ID,
        },
      })
      .then((response) => {
        setFormData(response.data);
        setOriginalData(response.data);
        setExtraData({
          id: response.data.id,
          userId: response.data.userId,
          uploadImage: response.data.uploadImage,
          applicationFromStatus: response.data.applicationFromStatus,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // sessionStorage.setItem("sidebar", JSON.stringify(false));
    return () => sessionStorage.setItem("sidebar", JSON.stringify(false));
  }, [ID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(BASE_URL + `api/updateapplicationForm/${ID}`, {
        ...formData,
        ...extraData,
      })
      .then((response) => {
        setOriginalData(formData);
        sessionStorage.setItem("sidebar", JSON.stringify(false));
        setTimeout(() => {
          window.location.href = "/pending";
        }, 3000);
        
        //window.location.href = "/logindone"
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  return (
    <>
      <Navbarforapp />
      <div
        className={
          sessionStorage.getItem("sidebar") === "true" ? "prof vform" : "prof"
        }
        style={{ position: "relative" }}
      >
        <h1 style={{ marginLeft: "400px", marginTop: "25px" }}>
          Your Application Form:
        </h1>
        <form
          onSubmit={handleSubmit}
          className={loading ? "upd-form load" : "upd-form"}
        >
          <label htmlFor="name">
            <h3>Name:</h3>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="adhaarCard">
            <h3>Adhar Card:</h3>
            <input
              type="text"
              id="adhaarCard"
              name="adhaarCard"
              value={formData.adhaarCard || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="collegeEmail">
            <h3>College Mail:</h3>
            <input
              type="text"
              id="collegeEmail"
              name="collegeEmail"
              value={formData.collegeEmail || ""}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            <h3>Email:</h3>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="sapModule">
            <h3>SAP Module:</h3>
            <input
              type="text"
              id="sapModule"
              name="sapModule"
              value={formData.sapModule || ""}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="contactNumber">
            <h3>Mobile Number:</h3>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="passoutYear">
            <h3>Passout Year:</h3>
            <input
              type="text"
              id="passoutYear"
              name="passoutYear"
              value={formData.passoutYear || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="branch">
            <h3>Department:</h3>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch || ""}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="specialization">
            <h3>Specialization:</h3>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization || ""}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="studentType">
            <h3>Type of student:</h3>
            <input
              type="text"
              id="studentType"
              name="studentType"
              value={formData.studentType || ""}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            disabled={!hasChanges}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {/* {isSuccess && <div style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Form Updated Successfully</div>} */}
        </form>
      </div>
    </>
  );
}

export default ApplicationAfterQuery;
