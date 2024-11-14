const verifyAccessToken = require("../services/users/verify-access-token");

const authenticateAccessToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const result = await verifyAccessToken(token);

    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    req.user = result.data;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = authenticateAccessToken;
