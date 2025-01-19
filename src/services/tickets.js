const { addDataWithGeneratedID, get, edit, deleteData, getAllByUser } = require("../utils/crud");

async function addTicket(dataToSend) {
  try {
    const ticket = await addDataWithGeneratedID("tickets", dataToSend);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function getTickets(userID) {
  try {
    const tickets = await getAllByUser("tickets", userID);
    return tickets;
  } catch (error) {
    throw error;
  }
}

async function getTicket(docID) {
  try {
    const ticket = await get("tickets", docID);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function editTicket(docID, dataToEdit) {
  try {
    const ticket = await edit("tickets", docID, dataToEdit);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function deleteTicket(docID) {
  try {
    await deleteData("tickets", docID);
  } catch (error) {
    throw error;
  }
}

module.exports = { addTicket, getTickets, getTicket, editTicket, deleteTicket };
