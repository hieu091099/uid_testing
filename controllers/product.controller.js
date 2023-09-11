const Product = require("../models/product.model");

const controller = {
  queryProductById: async (productId) => {
    try {
      const result = await Product.findOne({ id: productId });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  groupProductByDate: async () => {
    try {
      const result = await Product.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdDate" },
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1,
          },
        },
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  saveProduct: async (product) => {
    try {
      const result = await Product.create(product);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  saveManyProducts: async (products) => {
    try {
      const result = await Product.insertMany(products);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
