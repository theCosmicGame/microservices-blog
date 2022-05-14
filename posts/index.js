const express = require("express");             // server
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");      // function to generate random IDs
const cors = require("cors");                   // cross-origin resource sharing HTTP-header based mechanisms that permits other ports to load resources into a port
const axios = require("axios");                 // how we communicate with the database

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);  // send back all the posts that have been created
});

app.post("/posts", async (req, res) => {
    // create a randomly generated id for each new post a user creates
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;   // POST method of posts service requires the body have a { title: string }

  // ID object
  posts[id] = {
    id,
    title,
  };
  
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  // you create a RESOURCE by calling res.status(201)
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event at our (posts) < endpoint", req.body.type);

  // best practice is to return an empty post
  res.send({});
});

app.listen(port, () => {
  console.log("Listening on " + port);
});