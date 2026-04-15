function Header({ darkMode, toggleTheme }) {
  return (
    <div className="app-header">
      <div className="logo">
        <h1>FitFuel 🍎</h1>
        <p>Track your daily nutrition</p>
      </div>

      <button className="changeMode" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default Header;