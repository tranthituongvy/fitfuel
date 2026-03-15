import { createContext, useState, useEffect } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    
    const [foods, setFoods] = useState(() => {
        const savedFoods = localStorage.getItem("foods");

        return savedFoods ? JSON.parse(savedFoods) : [
            { id:1, name: "Chicken Breast", calories: 200 },
            { id:2, name: "Salmon", calories: 208 },
            { id:3, name: "Egg", calories: 78 },
        ]

    });

    useEffect(() => {
        localStorage.setItem("foods", JSON.stringify(foods));
    }, [foods]);

    const addFood = (name, calories) => {
        const newFood = {
            id: Date.now(),
            name,
            calories
        };

        setFoods([...foods, newFood]);
    };

    const increaseCalories = (id) => {
        setFoods(prevFoods =>
            prevFoods.map(food =>
                food.id === id
                ? { ...food, calories: food.calories + 10 }
                : food
            )
        );
    };

    const deleteFood = (id) => {
        setFoods(prevFoods => 
            prevFoods.filter(food => food.id !== id)
        );
    };

    const updateCalories = (id, newCalories) => {
        setFoods(prevFoods => 
            prevFoods.map(food => 
                food.id === id
                ? {...food, calories: newCalories}
                :food
            )
        );
    };

    return (
        <FoodContext.Provider value={{ foods, addFood, increaseCalories, deleteFood, updateCalories }}>
            {children}
        </FoodContext.Provider>
    );
};