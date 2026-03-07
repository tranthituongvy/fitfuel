import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";

//function FoodCard({ food, onIncrease }) {
  //return (
    //<div onClick={() => onIncrease(food.id)}>
      //<h3>{food.name}</h3>
      //<p>{food.calories} cal</p>
    //</div>
  //);  
//}

function FoodCard({food}) {
  const { increaseCalories } = useContext(FoodContext);

  return (
    <div onClick={() => increaseCalories(food.id)}>
      <h3>{food.name}</h3>
      <p>{food.calories} cal</p>
    </div>
  );
}

export default FoodCard;