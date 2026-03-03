import "./App.css";
import Navbar from "./components/Navbar";
import { FoodContext, FoodProvider } from "./context/FoodContext";
import Home from "./pages/Home";

function App() {
  return (    
    <FoodProvider>
      <Home />
    </FoodProvider>  
  );
}

export default App;