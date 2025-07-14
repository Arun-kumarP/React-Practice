import React, { useEffect, useState } from 'react';
import '../styles/app.css';

const EmployeeDetails = () => {
    const [employees,setEmployees] = useState([])
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sara', 'Chris', 'Emma', 'Daniel', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Dubai', 'Rome', 'Chicago'];

    const getRandomItem = ((arr) => arr[Math.floor(Math.random() * arr.length)]);
    const generateEmployees = (() => {
        const employees = [];
        for (let i = 1; i <= 50; i++) {
            const empname = `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
            const location = getRandomItem(locations);
            employees.push({ empid: i, empname, location });
        }
        return employees;
    });

    useEffect(() => {
        const data = generateEmployees();
        setEmployees(data);
        console.log("Employee data generated:", data);
    }, []);


    const editData = (e) => {
        const empId = e.target.closest('tr').querySelector('td').textContent;
    }

    return (
        <div>
            <h2>Employee Details</h2>
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
                    <tbody>{
                        employees.map((employee) => (
                            <tr key={employee.empid}>
                                <td>{employee.empid}</td>
                                <td>{employee.empname}</td>
                                <td>{employee.location}</td>
                                <td >
                                    <button className="buttons" onClick = { editData} >Edit</button>
                                    <button className="buttons">Del</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDetails;
