import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost/recipe-app/Back_end/recipes/read.php?id=${id}`)
            .then(response => setRecipe(response.data));

        axios.get(`http://localhost/recipe-app/Back_end/comments/read.php?recipe_id=${id}`)
            .then(response => setComments(response.data));
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        const commentData = { recipe_id: id, comment: newComment };

        axios.post('http://localhost/recipe-app/Back_end/comments/create.php', commentData)
            .then(response => {
                if (response.data.success) {
                    setComments([...comments, { comment: newComment, created_at: new Date().toISOString() }]);
                    setNewComment('');
                } else {
                    alert('Error adding comment');
                }
            });
    };

    return (
        <div className="recipe-details">
            <h2>{recipe.name}</h2>
            <img src={recipe.image_url} alt={recipe.name} />
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.comment} - {new Date(comment.created_at).toLocaleString()}</li>
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
        </div>
    );
};

export default RecipeDetails;
