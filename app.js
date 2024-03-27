// Dependencies
const express = require("express");
const app = express();

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

// Adjust localhost if necessary
app.listen(5500);
