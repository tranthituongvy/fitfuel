import Dashboard from "./Dashboard";
import CaloriesChart from "./CaloriesChart";

function SummarySection({ foods, viewType }) {
  const totalFoods = foods.length;

  const totalCalories = foods.reduce((sum, food) => {
    return sum + food.calories;
  }, 0);

  const averageCalories =
    totalFoods === 0 ? 0 : Math.round(totalCalories / totalFoods);

  const chartData =
    viewType === "top"
      ? [...foods].sort((a, b) => b.calories - a.calories).slice(0, 5)
      : foods;

  return (
    <>
      <Dashboard
        totalFoods={totalFoods}
        totalCalories={totalCalories}
        averageCalories={averageCalories}
      />

      <div className="chart-container">
        <h3>
          {viewType === "top" ? "Top 5 Calories Foods" : "All Foods"}
        </h3>
        <CaloriesChart foods={chartData} />
      </div>
    </>
  );
}

export default SummarySection;