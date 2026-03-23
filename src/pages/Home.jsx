import { useContext, useState, useEffect } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";
import CaloriesChart from "../components/CaloriesChart";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories } = useContext(FoodContext);
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

    inputRef.current.focus();
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

      <div className="dashboard">
        
        <div className="stat-card">
          <h4>Total Food</h4>
          <p>{totalFoods}</p>
        </div>

        <div className="stat-card">
          <h4>Total Calories</h4>
          <p>{totalCalories}</p>
        </div>

        <div className="stat-card">
          <h4>Average Calories</h4>
          <p>{averageCalories}</p>
        </div>

      </div>

      <div className="chart-container">
        <h3>
          {viewType === "top" ? "Top 5 Calories Foods" : "All Foods"}
        </h3>  
        <CaloriesChart foods={chartData} />
      </div>      

      <div className="food-form">
          <input type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input type="number"
            placeholder="Calories"  
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button onClick={handleAddFood}>
            Add Food
          </button>  
      </div>  

      <div className="food-grid">
        {sortedFoods.map(food => (
          <FoodCard
            key={food.id}
            food={food}
            onIncrease={increaseCalories}
            onDelete={() => setSelectedId(food.id)}
            onUpdateCalories={updateCalories}
          />
        ))}
      </div>  

      {selectedId && (
        <div className="modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete "{selectedFood?.name}"?</p>

            <button onClick={() => {
              deleteFood(selectedId);
              setSelectedId(null);
            }}>
              Yes, Delete
            </button>

            <button  onClick={() => setSelectedId(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>    
  );  
}

export default Home;