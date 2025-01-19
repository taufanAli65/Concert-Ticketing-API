const {
  addConcert,
  getConcerts,
  getConcert,
  editConcert,
  deleteConcert,
} = require("../services/concerts");

async function createConcert(req, res) {
  try {
    const { name, date, time, location, ticket_price, available_tickets } =
      req.body;
    //validation input
    if (
      !name ||
      !date ||
      !time ||
      !location ||
      !ticket_price ||
      !available_tickets
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input data" });
    }

    const dataToSend = await addConcert({
      name,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
    });
    res.status(200).json({
      message: "New Concert Added Succesfully",
      concertData: dataToSend,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "New Concert Is Not Added", error: error.message });
  }
}

async function readConcerts(req, res) {
  try {
    const concertsData = await getConcerts();
    res.status(200).json({
      message: "Concerts Fetched Successfully",
      concerts: concertsData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get All Concerts Information Failed",
      error: error.message,
    });
  }
}

async function readConcert(req, res) {
  try {
    const concertID = req.params.id;
    const concertData = await getConcert(concertID);
    res
      .status(200)
      .json({ message: "Concert Fetched Successfully", concert: concertData });
  } catch (error) {
    res.status(500).json({
      message: "Get Concert Information Failed",
      error: error.message,
    });
  }
}

async function updateConcert(req, res) {
  try {
    const concertID = req.params.id;
    const { name, date, time, location, ticket_price, available_tickets } =
      req.body;

    if (
      !name ||
      !date ||
      !time ||
      !location ||
      !ticket_price ||
      !available_tickets
    ) {
      res
        .status(500)
        .json({ message: "Mising Some Fields Data, Please Try Again" });
    }

    const editedConcertData = await editConcert(concertID, {
      name,
      date,
      time,
      location,
      ticket_price,
      available_tickets,
    });
    res.status(200).json({
      message: "Concert Information Update Successfully",
      concert: editedConcertData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update Concert Failed!", error: error.message });
  }
}

async function deletedConcert(req, res) {
  try {
    const concertID = req.params.id;
    await deleteConcert(concertID);
    res.status(200).json({ message: "Concert Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Concert Did Not Deleted", error: error.message });
  }
}

module.exports = {
  createConcert,
  readConcerts,
  readConcert,
  updateConcert,
  deletedConcert,
};
