const { auth } = require("../firebase-config");

async function createUser(email, password, name) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: false,
      displayName: name,
      roles: "user", //auto assign user role to newly created account
      disabled: false,
    });
    return userRecord;
  } catch (error) {
    throw error;
  }
}

async function editUser(id, email, name) {
  try {
    await auth.updateUser(id, { email, name });
    return "User Edited Successfully";
  } catch (error) {
    throw errror;
  }
}

async function deleteUser(id) {
  try {
    await auth.deleteUser(id);
    return { message: "User Deleted Successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, editUser, deleteUser };
