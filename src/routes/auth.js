var express = require("express");
var router = express.Router();
var { getLogin, newUser } = require("../controller/auth");

router.post("/login", async (req, res) => getLogin(req, res));
router.post("/register", async (req, res) => newUser(req, res));
