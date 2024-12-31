const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const concertRouter = require("./routes/concert");

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/concert", concertRouter);

app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});