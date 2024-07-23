import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = { name, image_url: imageUrl, ingredients, steps, user_id: user.id };

        axios.post('http://localhost/recipe-app/Back_end/recipes/create.php', recipe)
            .then(response => {
                console.log(response.data); // Log the full response data
                if (response.data.success) {
                    alert('Recipe added successfully!');
                } else {
                    alert('Error adding recipe: ' + (response.data.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error); // Log any error from axios
                alert('Error adding recipe: ' + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
            <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required></textarea>
            <textarea placeholder="Steps" value={steps} onChange={e => setSteps(e.target.value)} required></textarea>
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default AddRecipe;
