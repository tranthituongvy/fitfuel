import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";
import CaloriesChart from "../components/CaloriesChart";
import Dashboard from "../components/Dashboard";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";
import FoodForm from "../components/FoodForm";
import Toast from "../components/Toast";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories, updateName } = useContext(FoodContext);
   const [search, setSearch] = useState("");
   const [sortType, setSortType] = useState("name");
   const [name, setName] = useState("");
   const [calories, setCalories] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [toast, setToast] = useState(null); 
   const [selectedFood, setSelectedFood] = useState(null);  

   const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.trim().toLowerCase())
   )
   
   const sortedFoods = [ ...filteredFoods ].sort((a, b) => {
    if(sortType === "name") {
      return a.name.localeCompare(b.name);
    }

    if(sortType === "calories") {
      return a.calories - b.calories;
    }

    return 0;
   })

   const handleAddFood = () => {
    if (!name.trim() || calories === "") return;

    addFood(name, Number(calories));
    setToastMessage("Food added ✅");

    setName("");
    setCalories("");
   }

   const totalFoods = foods.length;

   const totalCalories = foods.reduce((sum, food) => {
    return sum + food.calories;
   }, 0);

   const averageCalories = 
    totalFoods === 0 ? 0 : Math.round(totalCalories / totalFoods);

   const [viewType, setViewType] = useState("top");

  const chartData =
      viewType === "top"
        ? [...foods].sort((a, b) => b.calories - a.calories).slice(0, 5)
        : foods;
        
  const [selectedId, setSelectedId] = useState(null);  
  const foundFood = foods.find(f => f.id === selectedId);  
  
  useEffect(() => {
  if (!selectedId) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId]);

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if(!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 2000)

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleClickDelete = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedFood) return;

    deleteFood(selectedFood.id);  
    setSelectedFood(null);  
    setShowModal(false); 
    setToast("Deleted successfully ✅");
  };

 
   return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> 

      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="calories">Sort by Calories</option>
      </select>

      <Dashboard
        totalFoods={totalFoods}
        totalCalories={totalCalories}
        averageCalories={averageCalories}
      />        

      <div className="chart-container">
        <h3>
          {viewType === "top" ? "Top 5 Calories Foods" : "All Foods"}
        </h3>  
        <CaloriesChart foods={chartData} />
      </div> 

      <FoodForm 
        name = {name}
        calories = {calories}
        onNameChange ={(e) => setName(e.target.value)}
        onCaloriesChange = {(e) => setCalories(e.target.value)}
        handleAddFood = {handleAddFood}
      />  

      <div className="food-grid">
        {sortedFoods.map(food => (
          <FoodCard
            key={food.id}
            food={food}
            onIncrease={increaseCalories}
            onDelete={() => handleClickDelete(food)}
            onUpdateCalories={updateCalories}
            onUpdateName={(id, name) => {
              updateName(id, name);
              setToastMessage("Updated ✏️");
            }}
          />
        ))}
      </div>       

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}      
     
    </div>    
  );  
}

export default Home;