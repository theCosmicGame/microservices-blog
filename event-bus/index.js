const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4005;
app.use(bodyParser.json());

const events = [];

// implements endpoint to listen to events
// Posts request handler
app.post("/events", (req, res) => {
  //  WHAT COMES THROUGH THE REQUEST BODY IS THE EVENT!! woo
  const event = req.body;   // !! what along comes along via the body is considered an event

  events.push(event);

  // 
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
