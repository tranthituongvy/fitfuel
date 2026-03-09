import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";

function Home() {
   const { foods, addFood, increaseCalories, deleteFood, updateCalories } = useContext(FoodContext);

   return (
    <div className="home-container">
      <button onClick={addFood}>Add Food</button>

      {foods.map(food => (
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