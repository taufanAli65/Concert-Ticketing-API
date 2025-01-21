const { assignAdminRoles } = require("../services/admin");

async function assignAdmin(req, res) {
  try {
    const userID = req.params.id;
    await assignAdminRoles(userID)
    res.status(200).json({message: "Assign Admin Roles Successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = { assignAdmin };
