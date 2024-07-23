import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <header>
            <h1>Recipe App</h1>
            <div className="header-links">
                <Link to="/">Home</Link>
                <Link to="/add-recipe">Add Recipe</Link>
                {user ? (
                    <>
                        <span>Welcome, {user.username}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
