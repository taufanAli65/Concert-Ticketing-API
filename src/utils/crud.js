const db = require("../firebase-config");

async function add(collectionName, dataToSend) {
  try {
    const data = await db.collection(collectionName).add(dataToSend);
    return { id: data.id, data: dataToSend };
  } catch (error) {
    throw error;
  }
}

async function deleteData(collectionName, docID) {
  try {
    await db.collection(collectionName).doc(docID).delete();
    const message = `Document ID : ${docID} in ${collectionName} deleted successfully!`;
    return message;
  } catch (error) {
    throw error;
  }
}

async function edit(collectionName, docID, newData) {
  try {
    await db.collection(collection).doc(docID).update(newData);
    const updatedDoc = await db.collection(collectionName).doc(docID).get();
    const data = updatedDoc.data();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getAll(collectionName) {
  const data = [];
  try {
    const snapshot = await db.collection(collectionName).get();
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function get(collectionName, docID) {
  try {
    const docRef = db.collection(collectionName).doc(docID);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      throw new Error("Dokumen tidak ditemukan");
    }
    const data = docSnapshot.data();
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { add, getAll, get, edit, deleteData };
