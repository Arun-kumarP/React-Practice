import React, { useEffect, useState } from "react";
import "../styles/app.css";
import Form from "../components/Form";
import DropDown from "../components/DropDown";

const EmployeeDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchText, setSearchText] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "David",
    "Sara",
    "Chris",
    "Emma",
    "Daniel",
    "Olivia",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];
  const locations = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Berlin",
    "Sydney",
    "Toronto",
    "Dubai",
    "Rome",
    "Chicago",
  ];
  const filterOptions = [
    { item: "empname", value: "EMP_Name" },
    { item: "location", value: "Location" },
    { item: "empid", value: "EMP_ID" },
  ];

  useEffect(() => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const generateEmployees = () => {
      const data = [];
      for (let i = 1; i <= 50; i++) {
        const empname = `${getRandomItem(firstNames)} ${getRandomItem(
          lastNames
        )}`;
        const location = getRandomItem(locations);
        data.push({ empid: i, empname, location, editable: false });
      }
      return data;
    };
    const data = generateEmployees();
    setEmployeeDetails(data);
  }, []);

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
    const updated = employeeDetails.map((emp) =>
      emp.empid === empId ? { ...emp, editable: true } : emp
    );
    setEmployeeDetails(updated);
  };

  const saveData = (empId) => {
    const updated = employeeDetails.map((emp) =>
      emp.empid === empId ? { ...emp, editable: false } : emp
    );
    setEmployeeDetails(updated);
  };

  const deleteData = (empId) => {
    const updated = employeeDetails.filter((emp) => emp.empid !== empId);
    const reindexed = updated.map((emp, idx) => ({
      ...emp,
      empid: idx + 1,
    }));
    setEmployeeDetails(reindexed);
  };

  const handleFieldChange = (value, column, empId) => {
    const updated = employeeDetails.map((emp) =>
      emp.empid === empId ? { ...emp, [column]: value } : emp
    );
    setEmployeeDetails(updated);
  };

  const handleAddEmployee = (data) => {
    const newEmployee = {
      empid: employeeDetails.length + 1,
      empname: data.empName,
      location: data.location,
      editable: false,
    };
    setEmployeeDetails([...employeeDetails, newEmployee]);
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
              <th>EMP_Location</th>
              <th>Edit / Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredData().map((employee) => (
              <tr key={employee.empid}>
                <td>{employee.empid}</td>
                <td>
                  <input
                    type="text"
                    className={employee.editable ? "editable" : "non-editable"}
                    value={employee.empname}
                    disabled={!employee.editable}
                    onChange={(e) =>
                      handleFieldChange(
                        e.target.value,
                        "empname",
                        employee.empid
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className={employee.editable ? "editable" : "non-editable"}
                    value={employee.location}
                    disabled={!employee.editable}
                    onChange={(e) =>
                      handleFieldChange(
                        e.target.value,
                        "location",
                        employee.empid
                      )
                    }
                  />
                </td>
                <td>
                  <button
                    className="buttons"
                    onClick={() => editData(employee.empid)}
                  >
                    Edit
                  </button>
                  <button
                    className="buttons"
                    onClick={() => deleteData(employee.empid)}
                  >
                    Del
                  </button>
                  <button
                    className="buttons"
                    onClick={() => saveData(employee.empid)}
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
