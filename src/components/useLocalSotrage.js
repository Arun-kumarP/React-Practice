import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Get from localStorage and parse
  const readValue = () => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Update localStorage when storedValue changes
  useEffect(() => {
    try {
      const serialized = JSON.stringify(storedValue);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
export default useLocalStorage;

// function NameForm() {
//   const [name, setName] = useLocalStorage('userName', '');

//   return (
//     <div>
//       <input
//         value={name}
//         onChange={e => setName(e.target.value)}
//         placeholder="Enter your name"
//       />
//       <p>Hello, {name}!</p>
//     </div>
//   );
// }
