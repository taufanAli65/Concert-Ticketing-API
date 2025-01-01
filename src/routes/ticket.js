var express = require("express");
var router = express.Router();
var {
  createTicket,
  readTickets,
  readTicket,
  updateTicket,
  deletedTicket,
} = require("../controller/ticket");

router.post("/", async (req, res) => createTicket(req, res));
router.get("/", async (req, res) => readTickets(req, res));
router.get("/:id", async (req, res) => readTicket(req, res));
router.put("/:id", async (req, res) => updateTicket(req, res));
router.delete("/:id", async (req, res) => deletedTicket(req, res));

module.exports = router;
