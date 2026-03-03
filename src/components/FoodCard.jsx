function FoodCard({ food, onIncrease }) {
  return (
    <div onClick={() => onIncrease(food.id)}>
      <h3>{food.name}</h3>
      <p>{food.calories} cal</p>
    </div>
  );
}

export default FoodCard;