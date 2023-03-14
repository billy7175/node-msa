const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  console.log("event-bus  /events");
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((error) => {
    console.log(error.message);
  }); // posts
  axios.post("http://localhost:4001/events", event).catch((error) => {
    console.log(error.message);
  }); // commnets
  // axios.post("http://localhost:4002/events", event); //
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("event-bus server is running on 4005");
});
