function FoodCard({ food, onIncrease, onDelete }) {
  return (
    <div>
      <h3>{food.name}</h3>
      <p onClick={() => onIncrease(food.id)}>{food.calories} cal</p>

      <button onClick={() => onDelete(food.id)}>
        Delete
      </button>
    </div>
  );  
}

export default FoodCard;