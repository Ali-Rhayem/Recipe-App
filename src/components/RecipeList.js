import React, { useEffect, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/recipe-app/Back_end/recipes/readAll.php')
            .then(response => {
                setRecipes(response.data);
                gsap.fromTo('.recipe', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.3 });
            });
    }, []);

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div className="recipe" key={recipe.id}>
                    <h3>{recipe.name}</h3>
                    <img src={recipe.image_url} alt={recipe.name} />
                    <p>Stars: {recipe.stars}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
