import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/form.css";

const Form = ({ displayForm, handleAddEmployee }) => {
  const [empName, setEmpName] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(displayForm);

  const addData = () => {
    handleAddEmployee({
      empName: empName,
      location: location,
    });
  };
  return (
    <div className={`form-container ${showModal ? "show" : "hide"}`}>
      <form>
        <div className="form-group">
          <label htmlFor="empName">Employee Name</label>
          <input
            type="text"
            id="empName"
            name="empName"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addData();
          }}
        >
          Add Employee
        </button>

        <button
          type="button"
          className="buttons"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  displayForm: PropTypes.bool.isRequired,
  handleAddEmployee: PropTypes.func.isRequired,
};

export default Form;
