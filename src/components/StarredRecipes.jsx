import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './StarredRecipes.css'; // Import the CSS file

const StarredRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/recipe-app/Back_end/recipes/readStarredRecipes.php?user_id=${user.id}`)
                .then(response => {
                    setRecipes(response.data);
                });
        }
    }, [user]);

    const removeStar = (id) => {
        if (user) {
            axios.post('http://localhost/recipe-app/Back_end/recipes/removeStar.php', { recipe_id: id, user_id: user.id })
                .then(response => {
                    if (response.data.success) {
                        setRecipes(recipes.filter(recipe => recipe.id !== id));
                        // alert('Recipe removed successfully!');
                    } else {
                        alert('Error removing star: ' + response.data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error removing star: ' + error.message);
                });
        }
    }

    return (
        <div className="starred-recipes">
            <h2>Starred Recipes</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div className="recipe" key={recipe.id}>
                        <img src={recipe.image_url} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        <p>By: {recipe.username}</p>
                        <p>Stars: {recipe.stars}</p>
                        <button className="remove-button" onClick={() => removeStar(recipe.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarredRecipes;
