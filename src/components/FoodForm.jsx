function FoodForm ({name, calories, onNameChange, onCaloriesChange, handleAddFood}) {
    return (
        <div className="food-form">
          <input type="text"
            placeholder="Food name"
            value={name}
            onChange={onNameChange}
          />

          <input type="number"
            placeholder="Calories"  
            value={calories}
            onChange={onCaloriesChange}
          />

          <button onClick={handleAddFood}>
            Add Food
          </button>  
      </div>  
    );
}

export default FoodForm;