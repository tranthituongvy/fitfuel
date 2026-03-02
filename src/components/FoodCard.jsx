function FoodCard({ name, calories }) {
    return (
        <div>
            <h3>{name}</h3>
            <p>{calories} cal</p>
        </div>

    );
}

export default FoodCard;