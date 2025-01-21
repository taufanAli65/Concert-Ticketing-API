const { get, edit } = require("../utils/crud");

async function assignAdminRoles(userID) {
  try {
    const user = await get("users", userID);
    if(!user) {
        throw new Error("User Not Found");
    }
    await edit("users", userID, {roles: "admin"});
  } catch (error) {
    throw error;
  }
}

module.exports = { assignAdminRoles };
