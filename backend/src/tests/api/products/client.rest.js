const axios = require("axios");

const addProduct = async () => {
  const dummyProductData = {
    title: "Organic Honey",
    image: "https://example.com/images/organic-honey.jpg",
    stock: 100,
    category: "Beverages",
    description:
      "Pure organic honey harvested from local farms. Perfect for adding natural sweetness to your meals and drinks.",
    ingredients: ["Honey"],
    price: 9.99,
  };
  try {
    const response = await axios.post(
      `http://localhost:5000/api/product/create`,
      dummyProductData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Adding product error:", error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/product/all`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("Fetching error:", error);
  }
};

const getProductByCategory = async (category) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/${category}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Access products error:", error);
  }
};

const getProductByTitle = async (title) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/${title}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Access products error:", error);
  }
};

(async () => {
  const { category, title } = await addProduct();
  console.log("all")
  console.log(await getAllProducts());
  console.log("by category")
  console.log(await getProductByCategory(category));
  console.log("by title")
  console.log(await getProductByTitle(title));
  
})();
