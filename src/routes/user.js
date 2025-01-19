const express = require("express");
const authenticate = require("../middleware/authentication");
const { getUserInfo } = require("../controller/user");
const router = express();

router.get("/", authenticate, async (req, res) => getUserInfo(req, res));

module.exports = router;