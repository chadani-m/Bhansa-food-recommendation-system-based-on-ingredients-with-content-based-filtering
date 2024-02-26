create database bhansa;
use bhansa;
/*drop database bhansa;*/

-- Create the 'users' table to store user information
CREATE TABLE recipe_status (
  status_id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(50) NOT NULL
);

CREATE TABLE ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_type (
  user_type_id INT AUTO_INCREMENT PRIMARY KEY,
  user_type VARCHAR(50) NOT NULL
);

CREATE TABLE recipe (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL,
  recipe_description TEXT,
  status_id INT,
  CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES recipe_status(status_id)
);

CREATE TABLE recipe_ingredients (
  ingredient_id INT AUTO_INCREMENT,
  recipe_id INT,
  PRIMARY KEY (ingredient_id, recipe_id),
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  dob DATE,
  password VARCHAR(255) NOT NULL,
  user_type_id INT,
  CONSTRAINT fk_user_type FOREIGN KEY (user_type_id) REFERENCES user_type(user_type_id)
);

ALTER TABLE users
ADD COLUMN first_name VARCHAR(50),
ADD COLUMN last_name VARCHAR(50);

CREATE TABLE preferences (
  user_id INT,
  recipe_id INT,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT fk_user_pref FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_recipe_pref FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE measurement (
  measurement_id INT AUTO_INCREMENT PRIMARY KEY,
  quantity INT,
  recipe_id INT,
  CONSTRAINT fk_recipe_measure FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE favourite (
  user_id INT,
  recipe_id INT,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT fk_user_fav FOREIGN KEY (user_id) REFERENCES users(user_id) ,
  CONSTRAINT fk_recipe_fav FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE comment (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  recipe_id INT,
  text TEXT NOT NULL,
  CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES users(user_id) ,
  CONSTRAINT fk_recipe_comment FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE measurement_type (
  measurement_type_id INT AUTO_INCREMENT PRIMARY KEY,
  measurement_type_name VARCHAR(50) NOT NULL
);

drop table recipe_description;
CREATE TABLE recipe_procedure (
  procedure_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  procedure_description TEXT,
   CONSTRAINT fk_recipe_procedure FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);


INSERT INTO measurement_type (measurement_type_name) VALUES
('Teaspoon'),
('Tablespoon'),
('Cup'),
('Ounce'),
('Pound'),
('Gram'),
('Kilogram'),
('Milliliter'),
('Liter'),
('Pinch'),
('Dash'),
('Cloves'),
('Whole'),
('Slice'),
('Piece'),
('Clove'),
('Sprig'),
('Cup, chopped'),
('Cup, shredded'),
('Cup, sliced');


CREATE TABLE recipe_images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  image_url VARCHAR(255) NOT NULL,
  CONSTRAINT fk_recipe_image FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
