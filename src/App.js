// ROUTER INSTALLATION COMMENT:  npm install react-router-dom
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationButtons from "./pages/Navigationbuttons";
import "./styles/app.css";

// Import all your route components
import EmployeeDetails from "./pages/EmployeeDetails";
import Counter from "./pages/Counter";
import CustomHook from "./pages/CustomHook";

const App = () => {
  return (
    <div>
      <Router>
        <div className="app-container">
          <h1>My Learning App</h1>
          <button className="btn btn-secondary">Back</button>
        </div>
        <Routes>
          <Route path="/" element={<NavigationButtons />} />
          <Route path="/employeedetails" element={<EmployeeDetails />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/customhook" element={<CustomHook />} />
          {/* Optional: Redirect or 404 handler */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
