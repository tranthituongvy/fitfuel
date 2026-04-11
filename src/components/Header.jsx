function Header ({darkMode, setDarkMode}) {
    return (
        <div className="app-header">
            <div className="logo">
                <h1>FitFuel 🍎</h1>
                <p>Track your daily nutrition</p>
            </div>

            <button 
                className="changeMode" 
                onClick={() => setDarkMode(!darkMode)}>

                {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
            
        </div>
    );

}

export default Header;