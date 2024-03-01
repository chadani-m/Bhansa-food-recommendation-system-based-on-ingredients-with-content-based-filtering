// recipeRoute.js
const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();


router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );

//ingredient based search
router.get('/ingredientSearch', recipeController.renderIngredientSearch);
router.post('/ingredientSearch', recipeController.searchIngredientByRecipe);

//categories handling
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);

//search bar
router.post('/search', recipeController.searchRecipe);

//functions
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);


// //ingredient based search
// router.get('/content-based-filtering', recipeController.renderRecommendationSearch);
// router.post('/content-based-filtering', recipeController.recommendRecipeByRecipe);

module.exports = router;
