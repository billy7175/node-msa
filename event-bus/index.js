const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("event-bus post/events", event);

  axios.post("http://localhost:4000/events", event).catch((error) => {
    console.log('4000',error.message);
  }); // posts
  axios.post("http://localhost:4001/events", event).catch((error) => {
    console.log('4001',error.message);
  }); // commnets
  axios.post("http://localhost:4002/events", event).catch((error) => {
    console.log('4002',error.message);
  }); // query

  axios.post("http://localhost:4003/events", event).catch((error) => {
    console.log('4003',error.message);
  }); // moderation
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("event-bus server is running on 4005");
});
