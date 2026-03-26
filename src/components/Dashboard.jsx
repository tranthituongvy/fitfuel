function Dashboard({ totalFoods, totalCalories, averageCalories}) {
    return (
        <div className="dashboard">
        
        <div className="stat-card">
          <h4>Total Food</h4>
          <p>{totalFoods}</p>
        </div>

        <div className="stat-card">
          <h4>Total Calories</h4>
          <p>{totalCalories}</p>
        </div>

        <div className="stat-card">
          <h4>Average Calories</h4>
          <p>{averageCalories}</p>
        </div>

      </div>
    );

}

export default Dashboard;