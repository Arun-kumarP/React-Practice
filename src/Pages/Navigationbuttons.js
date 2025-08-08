import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

const NavigationButtons = () => {
  const navigate = useNavigate();

  const components = [
    { path: "/employeedetails", name: "employeedetails" },
    { path: "/draganddrop", name: "DragAndDrop" },
    { path: "/imagepreview", name: "ImagePreview" },
    { path: "/stopwatch", name: "StopWatch" },
    { path: "/countdown", name: "CountDown" },
    { path: "/counter", name: "Counter" },
    { path: "/customhook", name: "CustomHook" },
  ];

  const navigateToScreen = (componentName) => {
    const found = components.find((c) => c.name === componentName);
    if (found) {
      navigate(found.path);
    }
  };

  return (
    <div className="navigation-container">
      {components.map((screen) => (
        <div key={screen.name}>
          <button
            type="button"
            className="buttons-navigation"
            onClick={() => navigateToScreen(screen.name)}
          >
            {screen.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavigationButtons;
