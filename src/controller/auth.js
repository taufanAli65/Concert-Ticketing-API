const { login, register } = require("../services/auth");

async function getLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(500)
        .json({ message: "Mising Some Fields Data, Please Try Again" });
    }

    const idToken = await login(email, password);
    res.status(200).json({ message: "Login Successfull", idToken: idToken });
  } catch (error) {
    res.status(500).json({
      message: "Email or Password is invalid, Please Try Again",
      error: error.message,
    });
  }
}

async function newUser(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res
        .status(500)
        .json({ message: "Mising Some Fields Data, Please Try Again" });
    }

    const user = await register(email, password, name);
    res.status(200).json({
      message: "User Created Successfully",
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error While Register, Please Try Again",
      error: error.message,
    });
  }
}

module.exports = { getLogin, newUser };
