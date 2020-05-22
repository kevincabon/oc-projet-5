const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    polyfill: "babel-polyfill",
    app: "./src/index.js",
    produit: "./src/product.js",
    order: "./src/order.js",
    order_recap: "./src/order-recap.js",
    categorie: "./src/categorie.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
};