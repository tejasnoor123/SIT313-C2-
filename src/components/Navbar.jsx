import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                DEV@Deakin
            </Link>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search.."
                />
            </div>

            <div className="nav-links">
                <Link to="/post" className="nav-item">Post</Link>
                <Link to="/login" className="nav-item">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;