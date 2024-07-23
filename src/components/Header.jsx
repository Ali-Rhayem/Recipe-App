import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h2>Recipe App</h2>
            <div className="header-links">
                <Link to="/">Home</Link>
                <Link to="/add-recipe">Add Recipe</Link>
            </div>
        </header>
    );
};

export default Header;
