const express = require("express");
const router = express.Router();
const { getLogin, newUser } = require("../controller/auth");

router.post("/login", async (req, res) => getLogin(req, res));
router.post("/register", async (req, res) => newUser(req, res));

module.exports = router;
