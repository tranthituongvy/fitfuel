import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";
import CaloriesChart from "../components/CaloriesChart";
import Dashboard from "../components/Dashboard";
import ConfirmModal from "../components/ConfirmModal";
import FoodForm from "../components/FoodForm";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories, updateName } = useContext(FoodContext);
   const [search, setSearch] = useState("");
   const [sortType, setSortType] = useState("name");
   const [name, setName] = useState("");
   const [calories, setCalories] = useState("");

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
    if (!name || !calories) return;

    addFood(name, Number(calories));
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
  const selectedFood = foods.find(f => f.id === selectedId);  
  
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
            onDelete={() => setSelectedId(food.id)}
            onUpdateCalories={updateCalories}
            onUpdateName={updateName}
          />
        ))}
      </div>  

      <ConfirmModal
        isOpen={selectedId}
        food ={selectedFood}
        onConfirm={() => {
          deleteFood(selectedId);
          setSelectedId(null);
        }}

        onCancel={() => setSelectedId(null)}
      />
    </div>    
  );  
}

export default Home;