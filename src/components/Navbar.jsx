function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>FitFuel</h2>
            <div style={styles.links}>
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Cart</a>
            </div>
        </nav>

    )
}

const styles = {
    nav: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "1px solid #eee",
        gap: "20px"
    },
    logo: {
        margin: 0
    },
    links: {
        display: "grid",
        gridAutoFlow: "column",
        gap: "20px"
    }
}

export default Navbar;