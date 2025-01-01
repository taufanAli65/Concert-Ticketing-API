const { add, getAll, get, edit, deleteData } = require("../utils/crud");

async function addConcert(dataToSend) {
  try {
    const concert = add("concerts", dataToSend);
    return concert;
  } catch (error) {
    throw error;
  }
}

async function getConcerts() {
  try {
    const concerts = await getAll("concerts");
    return concerts;
  } catch (error) {
    throw error;
  }
}

async function getConcert(docID) {
  try {
    const concert = await get("concerts", docID);
    return concert;
  } catch (error) {
    throw error;
  }
}

async function editConcert(docID, dataToEdit) {
  try {
    const concert = await edit("concerts", docID, dataToEdit);
    return concert;
  } catch (error) {
    throw error;
  }
}

async function deleteConcert(docID) {
  try {
    await deleteData("concerts", docID);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addConcert,
  getConcerts,
  getConcert,
  editConcert,
  deleteConcert,
};
