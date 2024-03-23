// Dependencies
const express = require("express");
const app = express();

// Modules
const path = require("path");

// Routes
const adminData = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// Parse Incoming Data
app.use(express.urlencoded({ extended: true }));

// Forward access to the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// Display 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Adjust localhost if necessary
app.listen(5500);
