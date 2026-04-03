import FoodCard from "./FoodCard";

function FoodList({
  foods,
  onIncrease,
  onDelete,
  onUpdateCalories,
  onUpdateName,
  setToast
}) {
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