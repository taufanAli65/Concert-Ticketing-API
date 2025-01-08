const { auth } = require("../firebase-config");

async function authenticate(req, res, next) {
  const idToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!idToken) {
    res.status(401).json({ message: "No Token Provided" });
  }
  try {
    const user = await auth.verifyIdToken(idToken);
    req.user = user; //set the user information in req.user
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Retrieving Token", error: error.message });
  }
}

module.exports = { authenticate };
