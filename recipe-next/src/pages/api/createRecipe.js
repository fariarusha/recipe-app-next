// createRecipe.js

import prisma from "../../../prisma/prisma";

// import prisma from "../../prisma/prisma";

export default async function handler(req, res) {
  console.log(req, res, "req , res");
  if (req.method === "POST") {
    try {
      const newRecipe = await prisma.recipe.create({
        data: {
          title: req.body.title,
          ingredients: req.body.ingredients,
          instruction: req.body.instruction,
          image: req.body.image,
        },
      });
      res.json(newRecipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const recipes = await prisma.recipe.findMany();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
