const express = require("express");
const router = express();
const { assignAdmin } = require("../controller/admin");
const authenticate = require("../middleware/authentication");
const verifyRole = require("../middleware/verifyRole");

router.put("/assign/:id", authenticate, verifyRole, async(req, res) => assignAdmin(req, res));


module.exports = router;