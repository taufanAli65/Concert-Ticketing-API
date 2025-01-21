const express = require("express");
const router = express();
const { assignAdmin, getAllTicket } = require("../controller/admin");
const authenticate = require("../middleware/authentication");
const verifyRole = require("../middleware/verifyRole");

router.get("/tickets", authenticate, verifyRole, async(req, res) => getAllTicket(req, res));
router.put("/assign/:id", authenticate, verifyRole, async(req, res) => assignAdmin(req, res));


module.exports = router;