import { useState } from "react";
import FoodCard from "../components/FoodCard";

function Home() {
    const [foods, setFoods] = useState([
        { id: 1, name: "Chicken Breast", calories: 200 },
        { id: 2, name: "Salmon", calories: 208 },
        { id: 3, name: "Egg", calories: 78}
    ]);
    const addFood = () => {
        const newFood = {
            id: Date.now(),
            name: "Banana",
            calories: 89
        }

        setFoods([...foods, newFood]);
    }

    const increaseCalories = (id) => {
        console.log(id)
        const updateFoods = foods.map(food => {
            if(food.id === id) {
                return {
                    ...food,
                    calories: food.calories + 10
                };
            }
            return food;
        });

        setFoods(updateFoods);
    }

    
    return (
        <div className="home-container">
            <button onClick={addFood}>Add Food</button>  

            {foods.map(food => (
                <FoodCard 
                    key={food.id}
                    name={food.name}
                    calories={food.calories}
                    onClick={() => increaseCalories(food.id)}
                />

            ))}           
        </div>
    )
}

export default Home;