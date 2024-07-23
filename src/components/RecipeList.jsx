import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { UserContext } from './UserContext';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchRecipes = () => {
            axios.get(`http://localhost/recipe-app/Back_end/recipes/readAll.php?search=${search}`)
                .then(response => {
                    setRecipes(response.data);
                    gsap.fromTo('.recipe', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.3 });
                });
        };

        fetchRecipes();
    }, [search]);

    const handleStar = (id) => {
        axios.post('http://localhost/recipe-app/Back_end/recipes/starRecipe.php', { recipe_id: id, user_id: user.id })
            .then(response => {
                if (response.data.success) {
                    alert('Recipe starred successfully!');
                } else {
                    alert('Error starring recipe: ' + response.data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error starring recipe: ' + error.message);
            });
    };

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
                        <button onClick={() => handleStar(recipe.id)}>Star</button>
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
