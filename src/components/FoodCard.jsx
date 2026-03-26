import { useState, useEffect } from "react";

function FoodCard({ food, onIncrease, onDelete, onUpdateCalories, onUpdateName }) {
  
  const { id, name, calories } = food;  

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  return (
    <div className="food-card">
      {isEditing ? (
        <input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={() => { 
            if(editedName.trim()) {
              onUpdateName(id, editedName.trim());
            }
            setIsEditing(false)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onUpdateName(id, editedName.trim());
              setIsEditing(false);
            }
          }}
        />  
      ) : (
        <h3 onClick={() => setIsEditing(true)}>
          {name}
        </h3>
      )}
      
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

      <button onClick={onDelete}>
        Delete
      </button>
    </div>
  );  
}

export default FoodCard;