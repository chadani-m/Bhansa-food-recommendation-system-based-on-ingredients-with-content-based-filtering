require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.homepage = async (req, res) => {

  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('index', { title: 'Bhansa - Home', categories });

  }
  catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
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


async function insertDummyRecipeData() {
  try {
    await Recipe.insertMany([
      {
        "name": "Dal Bhat",
        "description": "Dal Bhat is the most beloved Nepali food of the Nepalese. It is a traditional yet popular Nepalese food...",
        "ingredients": [
          "2 cups rice",
          "2 cups lentils",
          "4 cups water (for rice)",
          "3 cups water (for lentils)",
          "Salt",
          "Turmeric",
          "Ginger",
          "Tomatoes",
          "Oil",
          "Cauliflower",
          "Potato",
          "Onion",
          "Chili",
          "Cumin powder",
          "Garlic paste"
          // Add other ingredients as needed
        ],
        category: 'thakali',
        image: "dalbhat.jpg" 
      },
      {
        "name": "Yomari",
        "description": "If you have heard about Newari food, then you definitely have heard about yomari. It is an authentic Newari food item prepared specially during a festival of the Newar community called Yomari Punhi. Yomari has an attractive appearance and tastes really sweet, but it is quite difficult to prepare. If you follow the instructions sincerely, then you will definitely prepare a perfect yomari.",
        "ingredients": [
          "4 cups Rice flour",
          "Hot water",
          "Chaku (for filler)",
          "Coconut powder",
          // Add other ingredients as needed
        ],
        "category": "newari",
        "image": "4.jpg" 
      },
      {
        "name": "Chatamari",
        "description": "Another mouth-watering Newari item that you must try to cook at home is Chatamari. It is easy to cook and is healthy as well. You can have it on your lunch or dinner on a daily basis for a balanced diet. Chatamari appears like a Western pizza visually and in structure, but let me tell you, it is nothing like pizza in taste and preparation technique.",
        "ingredients": [
          "1 cup Rice flour",
          "Water",
          "tomatoes",
          "bell peppers",
          "Eggs",
          "meats",
          // Add other ingredients as needed
        ],
        "category": "newari",
        "image": "chatamari.jpg" // Replace with the actual image file or URL
      },
      {
        "name": "Thukpa",
        "description": "Thukpa, a combo of noodles, vegetables, and lots of soup, is a Tibetan-influenced Nepali food item. It is mainly preferred in the winter season as it keeps our bodies warm and healthy. The cooking method of Thukpa is quite simple. You can either make vegetarian Thukpa by using vegetables as ingredients or make non-vegetarian Thukpa by putting meat as ingredients.",
        "ingredients": [
          "Noodles",
          "Salt",
          "onion",
          "mushroom",
          "green onion",
          "carrot",
          "capsicum",
          "beans",
          "tomatoes",
          "Oil",
          "turmeric",
          "chilies", "pepper", "cumin powder", "coriander powder",
          // Add other ingredients as needed
        ],
        "category": "himali",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Nepalese_Thuppa.jpg/640px-Nepalese_Thuppa.jpg" // Replace with the actual image file or URL
      },
      {
        "name": "Momo",
        "description": "Momo is a popular Nepali food item, small dumplings filled with various ingredients. Nepalese prefer momo in their lunch and hangouts. There are hardly any restaurants in Kathmandu that do not serve momos. You can find vegetarian, non-vegetarian, and vegan momos in various momo outlets in Kathmandu. These momos are not that hard to make but require a bunch of ingredients and time.",
        "ingredients": [
          "All-purpose flour",
          "Oil",
          "Onions",
          "Potatoes",
          "Cabbage",
          "Carrot",
          "Paneer",
          "Cauliflower",
          "Water",
          "Sesame seeds",
          "Cumin seeds",
          "Tomatoes",
          "Turmeric",
          "Salt",
          "Red chili powder",
          "Ginger garlic paste",
          "Lemon juice",
          "Coriander leaves",
          // Add other ingredients as needed
        ],
        "category": "himali",
        "image": "https://static.toiimg.com/thumb/60275824.cms?imgsize=1041917&width=800&height=800" // Replace with the actual image file or URL
      },
      {
        "name": "Selroti",
        "description": "Selroti is a sweet Nepali food item, made with warmth and joy, especially during Tihar. Nepalese offer selroti to goddess Laxmi in Tihar. However, you can consume selroti whenever you want as it is healthy and fulfills your appetite for long hours. Selroti is a ring-like structure made up of rice flour and is best served with tea for breakfast. Vegetarians love to eat selroti with alu ko achaar.",
        "ingredients": [
          "4 cups rice flour",
          "2 spoons ghee",
          "4 spoons butter",
          "Black pepper powder",
          "Sugar",
          "Water",
          "Oil for frying",
          // Add other ingredients as needed
        ],
        "category": "janajati",
        "image": "https://washburnreview.org/wp-content/uploads/2023/03/sel-roti.jpeg" // Replace with the actual image file or URL
      }
    ,
    ]);

  } catch (error) {
    console.log('err', + error)
  }
}

insertDummyRecipeData();



// async function insertDummyCategoryData(){
//  try{
//   await Category.insertMany([
//     {
//       "name":"newari",
//       "image":"newari.jpg"
//     },
//     {
//       "name":"thakali",
//       "image":"thakali.png"
//     },
//     {
//       "name":"himali",
//       "image":"himali.jpg"
//     },
//     {
//       "name":"madhesi",
//       "image":"madhesi.jpg"
//     },
//     {
//       "name":"janjati",
//       "image":"janjati.jpg"
//     },
//   ]);

//  } catch (error){
//  console.log('err', + error)
//  }
// }

// insertDummyCategoryData();