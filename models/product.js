const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, desc, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  //   Method to add the product into the json file
  save() {
    this.id = Math.random().toString();
    getProductsFromFIle((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
