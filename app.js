// Dependencies
const express = require("express");
const app = express();

// Database
const sequelize = require("./utility/db");

// Modules
const path = require("path");

// Controller
const errorController = require("./controllers/error");

// Allow usage of  templates
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Parse Incoming Data
app.use(express.urlencoded({ extended: true }));

// Forward access to the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Display 404
app.use(errorController.get404);

// Sync models to create the database tables
sequelize
  .sync()
  .then((res) => {
    // console.log(res);

    // Adjust localhost if necessary
    app.listen(5500);
  })
  .catch((err) => {
    console.log(err);
  });
