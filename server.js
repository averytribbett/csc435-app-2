require("dotenv").config();
const path = require("path");
const mongoose =  require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;
const User = require("./models/User");
const Product = require("./models/Product");
const cors = require("cors");
const bodyParser = require("body-parser");

// Configure app
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ?
     "https://csc435-app-2-cca1a46dee57.herokuapp.com/" :
     "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  })
}

// Start API
app.listen(PORT, () => console.log("Server is Listening"))

// Connect to DB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* *
 * Routes for the app
 */

// Route to create a new user.
app.post("/user", async (req, res) => {
  try {
    // Create a new user initialize cart to be empty
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      cart: [],
    });
    
    // Save the new user to the database
    await newUser.save();

    console.log("User created:", newUser);

    // Return new user
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    // Check if email and password match a user
    const auth = await User.find({ email: req.body.email, password: req.body.password });
    if (auth.length === 0) throw new Error("Invalid email or password");

    res.status(201).json({ email: req.body.email, password: req.body.password });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all products from db (display on Home page)
app.post("/products", async (req, res) => {
  try {
    // Create a new product
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
    });
    
    // Save the new product to the db
    await newProduct.save();

    console.log("Product created:", newProduct);

    // Return new product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
