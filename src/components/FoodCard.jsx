function FoodCard({ food, onIncrease, onDelete, onUpdateCalories }) {
  return (
    <div>
      <h3>{food.name}</h3>
      <input
        type="number"
        value={food.calories}
        onChange={(e) => 
          onUpdateCalories(food.id, Number(e.target.value))
        }
      /> 
      <span> cal</span> 
      <p onClick={() => onIncrease(food.id)}>{food.calories} cal</p>

      <button onClick={() => onDelete(food.id)}>
        Delete
      </button>
    </div>
  );  
}

export default FoodCard;