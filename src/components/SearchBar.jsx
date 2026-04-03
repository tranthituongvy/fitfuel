function SearchBar({ search, setSearch, sortType, setSortType }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="calories">Sort by Calories</option>
      </select>
    </>
  );
}

export default SearchBar;