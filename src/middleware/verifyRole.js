const { get } = require("../utils/crud");

async function verifyRole(req, res, next) {
  const userID = req.user.uid;
  try {
    const user = await get("users", userID);
    if (user.roles != "admin") {
      throw new Error("Access denied. Unauthorized role.");
    } else {
      next();
    }
  } catch (error) {
    res
      .status(403)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = verifyRole;
