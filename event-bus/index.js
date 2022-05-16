const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4005;
  const port_posts = 4000;
  const port_comments = 4001;
  const port_query = 4002;
  const port_bus = port;
  const port_moder = 4003;
app.use(bodyParser.json());

const events = [];

// implements endpoint to listen to events
// Posts request handler
app.post("/events", (req, res) => {
  //  WHAT COMES THROUGH THE REQUEST BODY IS THE EVENT!! woo
  const event = req.body;   // !! what along comes along via the body is considered an event

  events.push(event); // !! MOST RECENT push is at the END of the array!

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
