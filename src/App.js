// ROUTER INSTALLATION COMMENT:  npm install react-router-dom
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationButtons from "./Pages/Navigationbuttons";
import "./styles/app.css";

// Import all your route components
import EmployeeDetails from "./Pages/EmployeeDetails";
import Counter from "./Pages/Counter";
import CustomHook from "./Pages/CustomHook";
import LiveTest from "./Pages/LiveTest";

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
          <Route path="/livetest" element={<LiveTest />} />
          {/* Optional: Redirect or 404 handler */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
