// Dependencies
const express = require("express");
const app = express();

// Database
const sequelize = require("./utility/db");

// Models
const Product = require("./models/product");
const User = require("./models/user");

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

// Dummy User Middleware
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Use Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Display 404
app.use(errorController.get404);

// Relate models
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

// Sync models to create the database tables
sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    // Adjust localhost if necessary
    app.listen(5500);
  })
  .catch((err) => {
    console.log(err);
  });
