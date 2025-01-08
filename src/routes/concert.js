var express = require("express");
var router = express.Router();
var {
  createConcert,
  readConcerts,
  readConcert,
  updateConcert,
  deletedConcert,
} = require("../controller/concert");
var { authenticate } = require("../middleware/authentication");

router.post("/", authenticate, async (req, res) => createConcert(req, res));
router.get("/", authenticate, async (req, res) => readConcerts(req, res));
router.get("/:id", authenticate, async (req, res) => readConcert(req, res));
router.put("/:id", authenticate, async (req, res) => updateConcert(req, res));
router.delete("/:id", authenticate, async (req, res) =>
  deletedConcert(req, res)
);

module.exports = router;
