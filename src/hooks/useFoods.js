import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";

export const useFoods = (search, sortType) => {
  const {
    foods,
    addFood,
    deleteFood,
    updateCalories,
    updateName,
    increaseCalories
  } = useContext(FoodContext);

  // filter
  const filteredFoods = (foods || []).filter(food =>
    food.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // sort
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortType === "name") return a.name.localeCompare(b.name);
    if (sortType === "calories") return a.calories - b.calories;
    return 0;
  });

  // handlers
  const addFoodHandler = (name, calories) => {
    if (!name.trim() || calories === "") return;
    addFood(name, Number(calories));
  };

  const deleteFoodHandler = (id) => {
    deleteFood(id);
  };

  const updateNameHandler = (id, name) => {
    updateName(id, name);
  };

  const updateCaloriesHandler = (id, calories) => {
    updateCalories(id, calories);
  };

  const increaseCaloriesHandler = (id) => {
    increaseCalories(id);
  };

  return {
    foods,
    sortedFoods,
    addFoodHandler,
    deleteFoodHandler,
    updateNameHandler,
    updateCaloriesHandler,
    increaseCaloriesHandler
  };
};