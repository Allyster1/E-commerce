// Dependencies
const express = require("express");

const app = express();

// Modules
const path = require("path");

// Routes
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// Allow usage of  templates
app.set("view engine", "ejs");
app.set("views", "views");

// Parse Incoming Data
app.use(express.urlencoded({ extended: true }));

// Forward access to the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Display 404
app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { path: req.originalUrl, pageTitle: "Page Not Found" });
});

// Adjust localhost if necessary
app.listen(5500);
