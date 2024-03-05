const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render registration page
exports.registerUser = (req, res) => {
  res.render('register', { title: 'Register' });
};


/**
 * GET /flash message
*/
exports.register = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoRegisterObj = req.flash('infoRegister');
  res.render('register', { title: 'Bhansa - register', infoErrorsObj, infoRegisterObj} );
} 




/**
 * POST /register
 * Register user
 */
exports.registerUserOnPost = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any required fields are missing
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }

    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      req.flash('infoRegister', 'User already exists.');
      res.redirect('/login');
      return;
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save user to the database
    await newUser.save();

    req.flash('infoRegister', 'User registered successfully.');
    res.redirect('/login');
  } catch (error) {
    req.flash('infoErrors', 'Error in registering user');
    res.redirect('/register');
  }
};


// Render login page
exports.loginUser = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Handle user login (POST request)
exports.loginUserOnPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findByEmail(email);

    // If user not found or password doesn't match, display error message
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { title: 'Login', error: 'Invalid email or password. Please try again.' });
    }

    // If credentials are valid, set user session and redirect to home page or dashboard
  
    req.session.user = user;
    res.redirect('/'); // Redirect to home page or dashboard after successful login
  } catch (error) {
    // If an error occurs during login, handling it 
    res.status(500).render('login', { title: 'Login', error: error.message || "Error Occurred" });
  }
};
