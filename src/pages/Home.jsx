import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import FoodCard from "../components/FoodCard";

function Home() {
   const { foods, addFood, increaseCalories } = useContext(FoodContext);

   return (
    <div className="home-container">
      <button onClick={addFood}>Add Food</button>

      {foods.map(food => (
        <FoodCard
          key={food.id}
          food={food}
          onIncrease={increaseCalories}
        />
      ))}
    </div>
   );
}

export default Home;