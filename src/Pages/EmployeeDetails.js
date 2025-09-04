import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, addEmployee, editEmployee, deleteEmployee } from '../Redux/EmployeeSlice';
import "../styles/app.css";
// import axios from "axios";
// import _ from 'lodash/';
import Form from "../components/Form";
import DropDown from "../components/DropDown";

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const employeeDetails = useSelector(state => state.employees.list);
  const status = useSelector(state => state.employees.status);
  const [searchField, setSearchField] = useState("");
  const [searchText, setSearchText] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const filterOptions = [
    { item: "empName", value: "EMP_Name" },
    { item: "empLocation", value: "empLocation" },
    { item: "empId", value: "EMP_ID" },
  ];
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const filteredData = () => {
    if (!searchField || !searchText) return employeeDetails;
    return employeeDetails.filter((item) =>
      item[searchField]
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  };

  const handleSearchFields = (value) => {
    setSearchField(value);
    setSearchText("");
  };
  const editData = (empId) => {
    dispatch(editEmployee({ empId, editable: true }));
  };

  const saveData = (empId) => {
    dispatch(editEmployee({ empId, editable: false }));
  };

  const deleteData = (empId) => {
    dispatch(deleteEmployee(empId));
  };

  const handleFieldChange = (value, column, empId) => {
    dispatch(editEmployee({ empId, [column]: value }));
  };

  const handleAddEmployee = (data) => {
    dispatch(addEmployee({
      empId: employeeDetails.length + 1,
      empName: data.empName,
      empLocation: data.empLocation,
      editable: false,
    }));
    setDisplayForm(false);
  };
 

  const currentSearchLabel =
    filterOptions.find((opt) => opt.item === searchField)?.value || "";

  return (
    <>
      <h2 className="padding-10">Employee Details</h2>

      <span> Search By Using:</span>
      {
        <DropDown
          fieldValue={searchField}
          dropDownArray={filterOptions}
          getValue={handleSearchFields}
        />
      }

      <input
        type="text"
        className="input-field margin-10"
        placeholder={`Search by ${currentSearchLabel}`}
        value={searchText}
        disabled={!searchField}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <button
        className="buttons margin-10 padding-5 margin-left-43"
        onClick={() => setDisplayForm(!displayForm)}
      >
        Add New Employee
      </button>

      <div className="employee-table">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>EMP_ID</th>
              <th>EMP_Name</th>
              <th>EMP_empLocation</th>
              <th>Edit / Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredData() &&
              filteredData().map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>
                    <input
                      type="text"
                      className={
                        employee.editable ? "editable" : "non-editable"
                      }
                      value={employee.empName}
                      disabled={!employee.editable}
                      onChange={(e) =>
                        handleFieldChange(
                          e.target.value,
                          "empName",
                          employee.empId
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={
                        employee.editable ? "editable" : "non-editable"
                      }
                      value={employee.empLocation}
                      disabled={!employee.editable}
                      onChange={(e) =>
                        handleFieldChange(
                          e.target.value,
                          "empLocation",
                          employee.empId
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="buttons"
                      onClick={() => editData(employee.empId)}
                    >
                      Edit
                    </button>
                    <button
                      className="buttons"
                      onClick={() => deleteData(employee.empId)}
                    >
                      Del
                    </button>
                    <button
                      className="buttons"
                      onClick={() => saveData(employee.empId)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {displayForm && (
        <Form displayForm={displayForm} handleAddEmployee={handleAddEmployee} />
      )}
    </>
  );
};

export default EmployeeDetails;
