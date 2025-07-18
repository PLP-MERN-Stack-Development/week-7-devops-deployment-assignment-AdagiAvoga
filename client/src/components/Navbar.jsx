import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="flex items-centre justify-between p-4 bg-gray-800 text-white">
            <Link to="/" className="font-bold text-xl">MERN Blog</Link>
            <div className="flex gap-4">
                {user ? (
                    <>
                    <span>Welcome, {user.username}</span>
                    <Link to="/create">New Post</Link>
                    <button onClick={handleLogout} className="text-red-300">Logout</button>
                </>
                ) : (
                    <>
                    <Link to="/login">Login</Link>
                     <Link to="/register">Register</Link>
                     </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;