import React, { useEffect, useState } from "react";
import ingredientsData from "../../../ingredients.json";
import UpdateItem from "@/components/UpdateItem";
// import { PrismaClient } from "../../../prisma/generated/client";

// const prisma = new PrismaClient();
const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [image, setImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [editableRecipeIndex, setEditableRecipeIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditableRecipeIndex(index);
  };

  const handleUpdate = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe, index) =>
      index === editableRecipeIndex ? updatedRecipe : recipe
    );

    setRecipes(updatedRecipes);
    setEditableRecipeIndex(null);
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleDelete = (index) => {
    const updatedRecipes = recipes.filter((recipe, i) => i !== index);
    setRecipes(updatedRecipes);
    setEditableRecipeIndex(null);
  };
  
  /* Tried it with prisma, not working */
  /*  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !ingredients || ingredients.length === 0 || !instruction) {
      alert("fill in all required fields.");
      return;
    }

    try {
      await fetch("/api/createRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          ingredients,
          instruction,
          image: image ? URL.createObjectURL(image) : null,
        }),
      });
      console.log("went into");
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const newRecipe = await response.json();
      const response = await fetch("/api/createRecipe");
      console.log(response, "response");
      const updatedRecipes = await response.json();
      setRecipes(updatedRecipes);
      setTitle("");
      setIngredients([]);
      setInstruction("");
      setImage(null);
    } catch (error) {
      console.error("Error", error);
    }
  }; */

  /* without prisma */
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || ingredients.length === 0 || !instruction) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRecipe = {
      title,
      ingredients,
      instruction,
      image: image ? URL.createObjectURL(image) : null,
    };
    setRecipes([...recipes, newRecipe]);
    setTitle("");
    setIngredients([]);
    setInstruction("");
    setImage(null);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 flex item-container">
          <div className="card w-2/4">
            <div className="card-body">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Recipe Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ingredients:
                  </label>
                  <select
                    multiple
                    className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={ingredients}
                    onChange={(e) =>
                      setIngredients(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {ingredientsData.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.label}>
                        {ingredient.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Instruction:
                  </label>
                  <textarea
                    className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter recipe instructions..."
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image/Video (Optional):
                  </label>
                  <input
                    type="file"
                    className="form-control-file shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button
                  type="submit"
                  className="my-5 btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Recipe
                </button>
              </form>
            </div>
          </div>
          <div className="created-item-section w-2/4">
            <div>
              <h2 className="text-3xl font-bold dark:text-black text-center my-5">
                Created Recipes
              </h2>
              <ul>
                {recipes.map((recipe, index) => (
                  <li key={index}>
                    {editableRecipeIndex === index ? (
                      <UpdateItem recipe={recipe} onUpdate={handleUpdate} />
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div className="list">
                            <h3>{`Title: ${recipe.title}`}</h3>
                            <p>{`Instruction: ${recipe.instruction}`}</p>
                            <ol>
                              {recipe.ingredients.map(
                                (ingredient, ingredientIndex) => (
                                  <li
                                    key={ingredientIndex}
                                  >{`Ingredient: ${ingredient}`}</li>
                                )
                              )}
                            </ol>
                            {recipe.image && (
                              <img
                                src={recipe.image}
                                alt={`Image for ${recipe.title}`}
                                style={{ maxWidth: "100%" }}
                              />
                            )}
                          </div>
                          <div className="action flex items-start">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() => handleEditClick(index)}
                              id="edit"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() => handleDelete(index)}
                              id="delete"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
