const { auth } = require("../firebase-config");
const { addDataWithoutGeneratedID, get } = require("./crud");

async function createUser(email, password, name) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: false,
      displayName: name,
      disabled: false,
    });
    await addDataWithoutGeneratedID("users", userRecord.uid, {
      email: userRecord.email,
      displayName: userRecord.displayName,
      roles: "user", // Assign default role
    });
    return userRecord;
  } catch (error) {
    throw error;
  }
}

async function editUser(userID, email, name) {
  try {
    await auth.updateUser(userID, { email, name });
    return "User Edited Successfully";
  } catch (error) {
    throw errror;
  }
}

async function deleteUser(userID) {
  try {
    await auth.deleteUser(userID);
    return { message: "User Deleted Successfully" };
  } catch (error) {
    throw error;
  }
}

async function retrieveUserInfo(userID) {
  try {
    const userRecord = await get("users", userID);
    return userRecord;
  } catch (error) {
    throw new Error(
      "There is no user record corresponding to the provided identifier."
    );
  }
}

module.exports = { createUser, editUser, deleteUser, retrieveUserInfo };
