import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import { jsPDF } from 'jspdf';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyles.css';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost/recipe-app/Back_end/recipes/read.php?id=${id}`)
            .then(response => {
                setRecipe(response.data);
            });

        axios.get(`http://localhost/recipe-app/Back_end/comments/read.php?recipe_id=${id}`)
            .then(response => setComments(response.data));
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        const commentData = { recipe_id: id, comment: newComment, user_id: user.id };

        axios.post('http://localhost/recipe-app/Back_end/comments/create.php', commentData)
            .then(response => {
                if (response.data.success) {
                    setComments([...comments, { comment: newComment, created_at: new Date().toISOString(), username: user.username }]);
                    setNewComment('');
                } else {
                    alert('Error adding comment');
                }
            });
    };

    const downloadRecipe = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(recipe.name, 10, 10);
        doc.setFontSize(12);
        doc.text(`By: ${recipe.username}`, 10, 20);
        doc.text(`Ingredients:`, 10, 30);
        doc.text(recipe.ingredients, 10, 40);
        doc.text(`Steps:`, 10, 50);
        doc.text(recipe.steps, 10, 60);
        doc.save(`${recipe.name}.pdf`);
    };

    const recipeUrl = window.location.href;

    const notify = () => toast.success("Copied!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
        <div className="recipe-details">
            <h2>{recipe.name}</h2>
            <img src={recipe.image_url} alt={recipe.name} />
            <p><strong>By:</strong> {recipe.username}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}><strong>{comment.username}</strong>: {comment.comment} - {new Date(comment.created_at).toLocaleString()}</li>
                ))}
            </ul>
            <form onSubmit={handleAddComment} className="comment-form">
                <textarea
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Add Comment</button>
            </form>
            <button onClick={downloadRecipe}>Download Recipe</button>
            <CopyToClipboard text={recipeUrl} onCopy={notify}>
                <button>Copy URL to the clipboard</button>
            </CopyToClipboard>
            <ToastContainer />
        </div>
    );
};

export default RecipeDetails;
