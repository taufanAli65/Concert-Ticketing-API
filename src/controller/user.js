const { retrieveUserInfo } = require("../utils/authentication");

async function getUserInfo(req, res) {
  try {
    const userID = req.user.uid;
    const userData = await retrieveUserInfo(userID);
    res.status(200).json({ message: "Retrieve User Information Success", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = { getUserInfo };