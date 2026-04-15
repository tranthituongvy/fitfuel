import { useState } from "react";

import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import SummarySection from "../components/SummarySection";
import FoodForm from "../components/FoodForm";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

import { useFoods } from "../hooks/useFoods";

function Home() {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("name");

  const {
  foods,
  sortedFoods,
  addFoodHandler,
  deleteFoodHandler,
  updateNameHandler,
  updateCaloriesHandler,
  increaseCaloriesHandler
} = useFoods(search, sortType);
 
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const viewType = "top"; 

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
    if (!selectedFood?.id) return;
    deleteFoodHandler(selectedFood.id);
    setToast(`Deleted "${selectedFood.name}" ❌`);
    closeModal();
  };

  const handleAddFood = () => {    
    if (!name.trim() || calories === "") return;

    addFoodHandler(name, calories);
    setToast(`Added "${name.trim()}" ✅`);
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
        onIncrease={increaseCaloriesHandler}
        onDelete={openDeleteModal}
        onUpdateCalories={updateCaloriesHandler}
        onUpdateName={updateNameHandler}
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