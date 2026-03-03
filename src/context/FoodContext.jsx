import { Children, createContext, useState } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([
        { id:1, name: "Chicken Breast", calories: 200 },
        { id:2, name: "Salmon", calories: 208 },
        { id:3, name: "Egg", calories: 78 },
    ]);

    const addFood = () => {
        const newFood = {
            id: Date.now(),
            name: "Banana",
            calories: 89
        };

        setFoods([...foods, newFood]);
    };

    const increaseCalories = (id) => {
        const updateFoods = foods.map(food => 
            food.id === id
            ?{ ...food, calories: food.calories + 10 }
            : food
        );

        setFoods(updateFoods);
    };

    return (
        <FoodContext.Provider value={{ foods, addFood, increaseCalories }}>
            {children}
        </FoodContext.Provider>
    );
};