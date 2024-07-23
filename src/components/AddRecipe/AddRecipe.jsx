import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("user_id", user.id);

    axios
      .post(
        "http://localhost/recipe-app/Back_end/recipes/create.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success("Recipe added successfully!");
        } else {
          toast.error("Error adding recipe: " + (response.data.message || "Unknown error"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding recipe: " + error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Recipe</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
