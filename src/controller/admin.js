const {
  assignAdminRoles,
  getAllSoldTicketInformation,
} = require("../services/admin");

async function assignAdmin(req, res) {
  try {
    const userID = req.params.id;
    await assignAdminRoles(userID);
    res.status(200).json({ message: "Assign Admin Roles Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function getAllTicket(req, res) {
  try {
    const tickets = await getAllSoldTicketInformation();
    res
      .status(200)
      .json({ message: "Tickets Fetched Successfully", tickets: tickets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error While Fetching Ticket", error: error.message });
  }
}

module.exports = { assignAdmin, getAllTicket };
