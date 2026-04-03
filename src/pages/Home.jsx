import { useContext, useState } from "react";
import { FoodContext } from "../context/FoodContext";

import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import SummarySection from "../components/SummarySection";
import FoodForm from "../components/FoodForm";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

function Home() {
  const { foods, addFood, increaseCalories, deleteFood, updateCalories, updateName } = useContext(FoodContext);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("name");
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [viewType] = useState("top");

  // filter + sort
  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortType === "name") return a.name.localeCompare(b.name);
    if (sortType === "calories") return a.calories - b.calories;
    return 0;
  });

  // handlers
  const openDeleteModal = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFood(null);
  };

  const confirmDelete = () => {
    if (!selectedFood) return;
    deleteFood(selectedFood.id);
    setToast("Deleted successfully ✅");
    closeModal();
  };

  const handleAddFood = () => {
    if (!name.trim() || calories === "") return;
    addFood(name, Number(calories));
    setToast("Food added ✅");
    setName("");
    setCalories("");
  };

  return (
    <div className="home-container">

      <SearchBar
        search={search}
        setSearch={setSearch}
        sortType={sortType}
        setSortType={setSortType}
      />

      <SummarySection foods={foods} viewType={viewType} />

      <FoodForm
        name={name}
        calories={calories}
        onNameChange={(e) => setName(e.target.value)}
        onCaloriesChange={(e) => setCalories(e.target.value)}
        handleAddFood={handleAddFood}
      />

      <FoodList
        foods={sortedFoods}
        onIncrease={increaseCalories}
        onDelete={openDeleteModal}
        onUpdateCalories={updateCalories}
        onUpdateName={updateName}
        setToast={setToast}
      />

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}

export default Home;