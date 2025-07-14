import React from "react";
import "../styles/app.css"; // Import the scoped CSS
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count >= 1) setCount(count - 1);
  };
  
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h1>Counter</h1>
      <h2>{count}</h2>
      <div className = "buttons-counter">
        <button  onClick={increment}>
          Increment
        </button>
        <button  onClick={decrement}>
          Decrement
        </button>
        <button  onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
