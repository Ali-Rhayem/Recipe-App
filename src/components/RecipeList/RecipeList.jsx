import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipes = () => {
      axios
        .get(
          `http://localhost/recipe-app/Back_end/recipes/readAll.php?search=${search}`
        )
        .then((response) => {
          setRecipes(response.data);
          gsap.fromTo(
            ".recipe",
            { opacity: 0 },
            { opacity: 1, duration: 1, stagger: 0.3 }
          );
        });
    };

    fetchRecipes();
  }, [search]);

  const handleStar = (id) => {
    axios
      .post("http://localhost/recipe-app/Back_end/recipes/starRecipe.php", {
        recipe_id: id,
        user_id: user.id,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Recipe starred successfully!");
        } else {
          toast.error("Error starring recipe: " + response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error starring recipe: " + error.message);
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
        {recipes.map((recipe) => (
          <div className="recipe" key={recipe.id}>
            <img src={recipe.image_url} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>By: {recipe.username}</p>
            <p>Stars: {recipe.stars}</p>
            <button
              className="star-button"
              onClick={() => handleStar(recipe.id)}
            >
              Star
            </button>
            <Link to={`/recipe/${recipe.id}`}>
              <button className="view-details-button">View Details</button>
            </Link>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeList;