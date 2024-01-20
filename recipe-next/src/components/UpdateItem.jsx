import React, { useState } from "react";
import ingredientsData from "../../ingredients.json";

const UpdateItem = ({ recipe, onUpdate }) => {
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [editedIngredients, setEditedIngredients] = useState(
    recipe.ingredients
  );
  const [editedInstruction, setEditedInstruction] = useState(
    recipe.instruction
  );
  const [editedImage, setEditedImage] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      title: editedTitle,
      ingredients: editedIngredients,
      instruction: editedInstruction,
      image: editedImage,
    };
    onUpdate(updatedRecipe);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form
          className="rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleUpdate}
        >
          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Recipe Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ingredients:
            </label>
            <select
              multiple
              className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editedIngredients}
              onChange={(e) =>
                setEditedIngredients(
                  Array.from(e.target.selectedOptions, (option) => option.value)
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
              value={editedInstruction}
              onChange={(e) => setEditedInstruction(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image/Video (Optional):
            </label>
            <input
              type="file"
              className="form-control-file shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEditedImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="my-5 btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
