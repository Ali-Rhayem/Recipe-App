import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRecipes = () => {
            axios.get(`http://localhost/recipe-app/Back_end/recipes/readAll.php?search=${search}`)
                .then(response => {
                    setRecipes(response.data);
                    console.log(response.data);
                    gsap.fromTo('.recipe', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.3 });
                });
        };

        fetchRecipes();
    }, [search]);

    return (
        <div>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div className="recipe" key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <img src={recipe.image_url} alt={recipe.name} />
                        <p>By: {recipe.username}</p>
                        <p>Stars: {recipe.stars}</p>
                        <Link to={`/recipe/${recipe.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
