const { add, getAll, get, edit, deleteData } = require("../utils/crud");

async function addTicket(dataToSend) {
  try {
    const ticket = add("tickets", dataToSend);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getTickets() {
  try {
    const tickets = await getAll("tickets");
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getTicket(docID) {
  try {
    const tickets = await get("tickets", docID);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function editTicket(docID, dataToEdit) {
  try {
    const tickets = await edit("tickets", docID, dataToEdit);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function deleteTicket(docID) {
  try {
    const ticketToDelete = await deleteData(docID);
    return ticketToDelete;
  } catch (error) {
    throw error;
  }
}

module.exports = { addTicket, getTickets, getTicket, editTicket, deleteTicket };
