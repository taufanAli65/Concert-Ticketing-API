var express = require("express");
var router = express.Router();
var {
  createConcert,
  readConcerts,
  readConcert,
  updateConcert,
  deletedConcert,
} = require("../controller/concert");

router.post("/", async (req, res) => createConcert(req, res));
router.get("/", async (req, res) => readConcerts(req, res));
router.get("/:id", async (req, res) => readConcert(req, res));
router.put("/:id", async (req, res) => updateConcert(req, res));
router.delete("/:id", async (req, res) => deletedConcert(req, res));

module.exports = router;
