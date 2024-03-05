require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.homepage = async(req, res) => {
  try {
    const limitNumber = 15;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const newari = await Recipe.find({ 'category': 'newari' }).limit(limitNumber);
    const magar = await Recipe.find({ 'category': 'magar' }).limit(limitNumber);
    const himali = await Recipe.find({ 'category': 'himali' }).limit(limitNumber);
    const tharu = await Recipe.find({ 'category': 'tharu' }).limit(limitNumber);
    const hilly = await Recipe.find({ 'category': 'hilly' }).limit(limitNumber);
    const thakali = await Recipe.find({ 'category': 'thakali' }).limit(limitNumber);

    const food = { latest, newari, magar, himali, tharu, hilly, thakali };

    res.render('index', { title: 'Bhansa - Home', categories, food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


//get categories

exports.exploreCategories = async (req, res) => {

  try {
    const limitNumber = 15;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Bhansa - Category', categories });

  }
  catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
}



/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Bhansa - Recipe', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 




/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Bhansa - Categories', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


//calculateJaccardSimilarity algorithm
const calculateJaccardSimilarity = (recipe1, recipe2) => {
  const ingredientsSet1 = new Set(recipe1.ingredients);
  const ingredientsSet2 = new Set(recipe2.ingredients);

  const intersectionSize = [...ingredientsSet1].filter(ingredient => ingredientsSet2.has(ingredient)).length;
  const unionSize = ingredientsSet1.size + ingredientsSet2.size - intersectionSize;

  return unionSize === 0 ? 0 : intersectionSize / unionSize;
};
/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

    // Assuming the user is searching for a specific recipe
    if (recipe.length > 0) {
      const targetRecipe = recipe[0];
      const allRecipes = await Recipe.find();

      // Calculate Jaccard similarity scores for each recipe
      const similarityScores = allRecipes.map(otherRecipe => ({
        recipe: otherRecipe,
        similarity: calculateJaccardSimilarity(targetRecipe, otherRecipe),
      }));

      // Sort recipes by similarity in descending order
      const recommendedRecipes = similarityScores
        .filter(item => item.recipe._id.toString() !== targetRecipe._id.toString())
        .sort((a, b) => b.similarity - a.similarity)
        .map(item => item.recipe)

        //filtering common ingredients from recipe
        .filter(recommendedRecipe => !['water', 'salt'].some(ingredient => recommendedRecipe.ingredients.includes(ingredient.toLowerCase())));

      // Render the search results and recommended recipes
      res.render('search', { title: 'Bhansa - Search', recipe, recommendedRecipes });
    } else {
      // Render only the search results
      res.render('search', { title: 'Bhansa - Search', recipe });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}




/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Bhansa - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Bhansa - Explore Random', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Bhansa - Submit Recipe', infoErrorsObj, infoSubmitObj} );
}


/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}

// Render the ingredient search page
//get
exports.renderIngredientSearch = (req, res) => {
  res.render('ingredientSearch', { title: 'Ingredient Search', recipe: [] }); // Pass an empty array as the default value
};

//post
exports.searchIngredientByRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTermForIngredient;

    // Check if searchTerm is defined and not null
    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).send({ message: 'Invalid search term' });
    }

    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('ingredientSearch', { title: 'Bhansa -Ingredient based search', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

// Render the content-based-filtering search page
//get
exports.renderRecommendationSearch = (req, res) => {
  res.render('content-based-filtering', { title: 'Bhansa: Content-based-filtering Search', recipe: [] }); // Pass an empty array as the default value
};