function FoodCard({ food, onIncrease, onDelete, onUpdateCalories }) {
  
  const { id, name, calories } = food;

  return (
    <div className="food-card">
      <h3>{name}</h3>
      <input
        type="number"
        value={calories}
        onChange={(e) => 
          onUpdateCalories(id, Number(e.target.value))
        }
      /> 
      <span> cal</span> 

      <p onClick={() => onIncrease(id)}>{
        calories} cal
      </p>

      <button onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );  
}

export default FoodCard;