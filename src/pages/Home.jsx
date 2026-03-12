import { useContext, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories } = useContext(FoodContext);
   const [search, setSearch] = useState("");

   const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.trim().toLowerCase())
  );

   return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> 

      <button onClick={addFood}>Add Food</button>

      {filteredFoods.map(food => (
        <FoodCard
          key={food.id}
          food={food}
          onIncrease={increaseCalories}
          onDelete={deleteFood}
          onUpdateCalories={updateCalories}
        />
      ))}
    </div>
   );
}

export default Home;