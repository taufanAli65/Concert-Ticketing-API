const express = require("express");
const router = express.Router();
const {
  createConcert,
  readConcerts,
  readConcert,
  updateConcert,
  deletedConcert,
} = require("../controller/concert");
const authenticate = require("../middleware/authentication");
const verifyRole = require("../middleware/verifyRole");

router.post("/", authenticate, verifyRole, async (req, res) => createConcert(req, res));
router.get("/", authenticate, async (req, res) => readConcerts(req, res));
router.get("/:id", authenticate, async (req, res) => readConcert(req, res));
router.put("/:id", authenticate, verifyRole, async (req, res) => updateConcert(req, res));
router.delete("/:id", authenticate, verifyRole, async (req, res) => deletedConcert(req, res));

module.exports = router;
