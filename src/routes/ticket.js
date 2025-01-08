var express = require("express");
var router = express.Router();
var {
  createTicket,
  readTickets,
  readTicket,
  updateTicket,
  deletedTicket,
} = require("../controller/ticket");
var { authenticate } = require("../middleware/authentication");

router.post("/", authenticate, async (req, res) => createTicket(req, res));
router.get("/", authenticate, async (req, res) => readTickets(req, res));
router.get("/:id", authenticate, async (req, res) => readTicket(req, res));
router.put("/:id", authenticate, async (req, res) => updateTicket(req, res));
router.delete("/:id", authenticate, async (req, res) =>
  deletedTicket(req, res)
);

module.exports = router;
