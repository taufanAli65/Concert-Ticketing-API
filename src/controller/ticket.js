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
    const { concertID, ticket_types } = req.body;
    const userID = req.user.uid;
    const ticketInfo = {
      concertID: concertID,
      userID: userID,
      ticket_types: ticket_types,
      purchase_timestamp: getCurrentFormattedDateTime(date),
    };

    //validation input
    if (!concertID || !ticket_types) {
      return res
        .status(400)
        .json({ message: "Mising Some Fields Data, Please Try Again" });
    }

    const createdTicket = await addTicket(ticketInfo);
    res.status(200).json({
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
    const userID = req.user.uid;
    const ticketsData = await getTickets(userID);
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
    const userID = req.user.uid;
    const ticketData = await getTicket(ticketID);
    if (ticketData.userID != userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized, Cannot Read Other User Ticket!" });
    } //user cannot read other user data
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
    const userID = req.user.uid;
    const { concertID, ticket_types } = req.body;

    if (!concertID || !ticket_types) {
      res
        .status(500)
        .json({ message: "Mising Some Fields Data, Please Try Again" });
    }
    const ticketData = await getTicket(ticketID); //read ticket data
    if (ticketData.userID != userID) {
      res
        .status(403)
        .json({ message: "Unauthorized, Cannot Update Other User Ticket!" });
    } //user cannot read other user data
    else {
      const ticketData = await editTicket(ticketID, {
        concertID,
        ticket_types,
      });
      res
        .status(200)
        .json({ message: "Ticket Updated Successfully", ticket: ticketData });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update Ticket Failed!", error: error.message });
  }
}

async function deletedTicket(req, res) {
  try {
    const ticketID = req.params.id;
    const userID = req.user.uid;
    const ticketData = await getTicket(ticketID); //read ticket data
    if (ticketData.userID != userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized, Cannot Delete Other User Ticket!" });
    } //user cannot read other user data
    const deleted = await deleteTicket(ticketID);
    res.status(200).json({ message: deleted });
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
