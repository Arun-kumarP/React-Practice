import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/form.css";

const DropDown = ({ fieldValue, dropDownArray, getValue }) => {
  const [value, setValue] = useState(fieldValue || "");

  const selectValue = (event) => {
    const selected = event.target.value;
    setValue(selected);
    getValue(selected);
  };

  return (
    <select className="dropdown margin-10" value={value} onChange={selectValue}>
      <option value=""></option>
      {dropDownArray.map((option) => (
        <option key={option.item} value={option.item}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

DropDown.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  dropDownArray: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  getValue: PropTypes.func.isRequired,
};

export default DropDown;
