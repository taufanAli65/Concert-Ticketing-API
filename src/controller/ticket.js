const {
  addTicket,
  getTickets,
  getTicket,
  editTicket,
  deleteTicket,
} = require("../services/tickets");

const {
  getCurrentDateTime,
  getCurrentFormattedDateTime,
} = require("../utils/date");

async function createTicket(req, res) {
  const date = getCurrentDateTime();
  try {
    const { concert_id, userID, ticket_types } = req.body;
    const ticketInfo = {
      concert_id: concert_id,
      userID: userID,
      ticket_types: ticket_types,
      purchase_timestamp: getCurrentFormattedDateTime(date),
    };

    //validation input
    if (!concert_id || !userID || !ticket_types) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const createdTicket = await addTicket(ticketInfo);
    res
      .status(200)
      .json({
        message: "Ticket Created Successfully",
        ticketData: createdTicket,
      });
  } catch (error) {
    res.status(500).json({
      message: "Ticket Not Created Successfully",
      error: error.message,
    });
  }
}

async function readTickets(req, res) {
  try {
    const ticketsData = await getTickets();
    res
      .status(200)
      .json({ message: "Tickets Fetched Successfully", tickets: ticketsData });
  } catch (error) {
    res.status(500).json({
      message: "Get All Tickets Information Failed",
      error: error.message,
    });
  }
}

async function readTicket(req, res) {
  try {
    const ticketID = req.params.id;
    const ticketData = await getTicket(ticketID);
    res
      .status(200)
      .json({ message: "Ticket Fetched Successfully", ticket: ticketData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get Ticket Information Failed", error: error.message });
  }
}

async function updateTicket(req, res) {
  try {
    const ticketID = req.params.id;
    //const userID = req.user.uid;
    const { concert_id, userID, ticket_types } = req.body;
    const ticketData = await editTicket(ticketID, {
      concert_id,
      userID,
      ticket_types,
    });
    res
      .status(200)
      .json({ message: "Ticket Updated Successfully", ticket: ticketData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update Ticket Failed!", error: error.message });
  }
}

async function deletedTicket(req, res) {
  try {
    const ticketID = req.params.id;
    await deleteTicket(ticketID);
    res.status(200).json({ message: "Ticket Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Delete Ticket Failed!", error: error.message });
  }
}

module.exports = {
  createTicket,
  readTickets,
  readTicket,
  updateTicket,
  deletedTicket,
};
