import "./styles/App.scss";
import { FoodProvider } from "./context/FoodContext";
import Home from "./pages/Home";

function App() {
  return (    
    <FoodProvider>
      <Home />
    </FoodProvider>  
  );
}

export default App;