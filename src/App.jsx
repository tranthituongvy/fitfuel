import { useState, useEffect } from "react";
import "./styles/App.scss";
import { FoodProvider } from "./context/FoodContext";
import Home from "./pages/Home";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
  setDarkMode(prev => !prev);
};

  return (    
   <div className={darkMode ? "app dark": "app"}>
    <button className="changeMode" onClick={toggleDarkMode}>
      {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>

    <FoodProvider>
      <Home />
    </FoodProvider>  
   </div>
  );
}

export default App;