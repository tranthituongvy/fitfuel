import FoodCard from "./FoodCard";

function FoodList({
  foods,
  onIncrease,
  onDelete,
  onUpdateCalories,
  onUpdateName,
  setToast
}) {
  if(foods.lenght === 0) {
    return (
      <div className="empty-state">
        <h3>Not food yet 🍎</h3>
        <p>Start by adding your first meal!</p>
      </div>
    );
  }
  return (
    <div className="food-grid">
      {foods.map(food => (
        <FoodCard
          key={food.id}
          food={food}
          onIncrease={onIncrease}
          onDelete={() => onDelete(food)}
          onUpdateCalories={onUpdateCalories}
          onUpdateName={(id, name) => {
            onUpdateName(id, name);
            setToast("Updated ✏️");
          }}
        />
      ))}
    </div>
  );
}

export default FoodList;