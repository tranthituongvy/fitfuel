import { useContext, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories } = useContext(FoodContext);
   const [search, setSearch] = useState("");
   const [sortType, setSortType] = useState("name");

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

      <button onClick={addFood}>Add Food</button>

      <div className="food-grid">
        {sortedFoods.map(food => (
          <FoodCard
            key={food.id}
            food={food}
            onIncrease={increaseCalories}
            onDelete={deleteFood}
            onUpdateCalories={updateCalories}
          />
        ))}
      </div>  
    </div>
   );
}

export default Home;