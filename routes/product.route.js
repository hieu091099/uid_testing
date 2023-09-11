const { axios } = require("axios");
const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { formatDate } = require("../helpers/date.hepler");
const {
  callShopifyProductWithLink,
  callShopifyAllProduct,
} = require("../helpers/shopify-query.helper");
const validate = require("../schemas/validation");

router.get("/", (req, res) => {
  res.json("product route");
});

router.post("/upsert", validate(), async (req, res) => {
  const { begin, end } = req.body;
  const query = `created_at_min=${formatDate(
    begin
  )}&created_at_max=${formatDate(end)}`;

  const allProduct = await callShopifyAllProduct(query);
  const { products } = allProduct;

  const arrayProductInsert = [];
  for (let item of products) {
    const product = {
      id: item.id,
      title: item.title,
      productType: item.product_type,
      createdDate: item.created_at,
      imageUrl: item.image.src,
    };
    arrayProductInsert.push(product);
  }
  await productController.saveManyProducts(arrayProductInsert);

  const groupIdsByDate = await productController.groupProductByDate();

  const result = groupIdsByDate.map(({ date, count }) => ({
    [date]: count,
  }));
  res.json(result);
});

router.post("/crawl-create", validate(), async (req, res) => {
  const { link } = req.body;

  try {
    const { product } = await callShopifyProductWithLink(link);
    const checkDuplicateProduct = await productController.queryProductById(
      product.id
    );
    // check duplicate product
    if (!checkDuplicateProduct) {
      const newProduct = {
        id: product.id,
        title: product.title,
        productType: product.product_type,
        createdDate: product.created_at,
        imageUrl: product.image.src,
      };

      const inserted = await productController.saveProduct(newProduct);
      res.status(201).json({ productId: inserted.id });
    } else {
      res.status(403).json({ message: "Product already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
