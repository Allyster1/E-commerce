const Product = require("../models/product");

// Render GET Requests on => '/admin/add-product'
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

// Handle POST Requests on => '/admin/add-product'
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

// Fetch and Handle GET Requests on => '/'
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Product Page",
      path: "/",
    });
  });
};
