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
    return (
        <div className="home-container">
            <button onClick={addFood}>Add Food</button>  

            {foods.map(food => (
                <FoodCard 
                    key={food.id}
                    name={food.name}
                    calories={food.calories}
                />

            ))}           
        </div>
    )
}

export default Home;