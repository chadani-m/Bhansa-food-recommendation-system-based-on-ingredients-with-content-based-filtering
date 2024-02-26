require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const newari = await Recipe.find({ 'category': 'newari' }).limit(limitNumber);
    const thakali= await Recipe.find({ 'category': 'hakali' }).limit(limitNumber);
    const himali = await Recipe.find({ 'category': 'himali' }).limit(limitNumber);

    const food = { latest, newari, thakali, himali };

    res.render('index', { title: 'Cooking Blog - Home', categories, food } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


//get categories

exports.exploreCategories = async (req, res) => {

  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Bhansa - Category', categories });

  }
  catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
}


async function insertDummyCategoryData(){
try{
await Category.insertMany([
 {
"name":"tharu",
"image":"tharu.jpg"
 },
// {
//  "name":"thakali",
//  "image":"thakali.png"
// },
// {
//  "name":"himali",
//  "image":"himali.jpg"
// },
// {
//  "name":"madhesi",
//   "image":"madhesi.jpg"
//  },
//  {
//   "name":"janjati",
//   "image":"janjati.jpg"
//    },
 ]);

} catch (error){
console.log('err', + error)
 }
}

insertDummyCategoryData();