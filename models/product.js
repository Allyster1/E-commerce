const fs = require("fs");
const path = require("path");

const Cart = require("./cart")

// Path to the data folder
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

// Helper function to read the file content
const getProductsFromFIle = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, desc, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  //   Method to add the product into the json file
  save() {
    getProductsFromFIle((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts(existingProductIndex) = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFIle((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFIle(cb);
  }

  static findById(id, cb) {
    getProductsFromFIle((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
