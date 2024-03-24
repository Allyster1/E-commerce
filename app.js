// Dependencies
const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();

// Modules
const path = require("path");

// Routes
const adminData = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// Allow usage of  templates
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Parse Incoming Data
app.use(express.urlencoded({ extended: true }));

// Forward access to the public folder
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// Display 404
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// Adjust localhost if necessary
app.listen(5500);
