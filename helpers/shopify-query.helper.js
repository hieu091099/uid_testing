require("dotenv").config();

const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;
const SHOPIFY_API = process.env.SHOPIFY_API;

async function callShopifyAllProduct(query) {
  const link = `${SHOPIFY_API}?${query}`;
  const requestOptions = {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": SHOPIFY_TOKEN,
    },
  };
  const response = await fetch(link, requestOptions);
  return await response.json();
}

async function callShopifyProductWithLink(link) {
  const response = await fetch(link);
  return await response.json();
}

module.exports = {
  callShopifyAllProduct,
  callShopifyProductWithLink,
};
