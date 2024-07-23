import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showConfirmToast } from './ConfirmToast';
import './toastStyles.css';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/recipe-app/Back_end/recipes/readUserRecipes.php?user_id=${user.id}`)
                .then(response => {
                    setRecipes(response.data);
                });
        }
    }, [user]);

    const handleDelete = (id) => {
        const onConfirm = () => {
            axios.post('http://localhost/recipe-app/Back_end/recipes/delete.php', { id, user_id: user.id })
                .then(response => {
                    if (response.data.success) {
                        setRecipes(recipes.filter(recipe => recipe.id !== id));
                        toast.success('Recipe deleted successfully!');
                    } else {
                        toast.error('Error deleting recipe: ' + response.data.error);
                    }
                })
                .catch(error => {
                    toast.error('Error deleting recipe: ' + error.message);
                });
        };

        const onCancel = () => {
            toast.dismiss();
        };

        showConfirmToast(onConfirm, onCancel);
    };

    return (
        <div>
            <h2>My Recipes</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div className="recipe" key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <img src={recipe.image_url} alt={recipe.name} />
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Steps: {recipe.steps}</p>
                        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default MyRecipes;
