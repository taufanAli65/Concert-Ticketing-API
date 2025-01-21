const { get, edit, getAll } = require("../utils/crud");

async function assignAdminRoles(userID) {
  try {
    const user = await get("users", userID);
    if (!user) {
      throw new Error("User Not Found");
    }
    await edit("users", userID, { roles: "admin" });
  } catch (error) {
    throw error;
  }
}

async function getAllSoldTicketInformation() {
  try {
    const tickets = await getAll("tickets");
    return tickets;
  } catch (error) {
    throw error;
  }
}

module.exports = { assignAdminRoles, getAllSoldTicketInformation };
