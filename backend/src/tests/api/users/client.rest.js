const axios = require("axios");

const loginUser = async () => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/login`,
      {
        email: "test@test.com",
        password: "test@1234",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
  }
};

const registerUser = async () => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/register`,
      {
        email: "test@test.com",
        password: "test@1234",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; 
  } catch (error) {
    console.log("Register error:", error);
  }
};

const accessOrders = async (token) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/user/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Orders response: ", response.data);
  } catch (error) {
    console.log("Access orders error:", error);
  }
};

(async () => {
  await registerUser();
  const loginResponse = await loginUser();
  
  if (loginResponse && loginResponse.AccessToken) {
    await accessOrders(loginResponse.AccessToken);
  } else {
    console.log("Failed to retrieve access token");
  }
})();
