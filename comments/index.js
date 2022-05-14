const express = require('express');         // server
const bodyParser = require('body-parser');  
const { randomBytes } = require('crypto');  // function to generate random IDs
const cors = require('cors');
const axios = require("axios");

const app = express();
const port = 4001
app.use(bodyParser.json());
app.use(cors());

// "byPostId" because we want this data structure  - to look up all the comments associated with a given post
const commentsByPostId = {};

//ROUTE HANDLERS
// DO NOT FORGET colon before id in route

// Get Comments Associated with a Post ID
// all comments will be stored within an IN-MEMORY Data Structure, hence the commentsByPostId object
// Given an ID of post (inside the request ie req req.params.id), returns array of comments as a response ie res
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);  // we use "|| []" so we ALWAYS send an array back to the user making this request
});

// ** Creating A New Comment **
// returns a comment of strucutre: {id: 'string', content: 'string'}
// req is the request handler
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

    // push in the new comment into the post's comment array
  comments.push({ id: commentId, content, status: "pending"  });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Received (comment)", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(port, () => {
    console.log('Listening on ' + port);
  });