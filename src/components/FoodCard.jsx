function FoodCard({ name, calories, onClick }) {   

    return (
        <div onClick={onClick}>
            <h3>{name}</h3>
            <p>{calories} cal</p>
        </div>

    );
}

export default FoodCard;