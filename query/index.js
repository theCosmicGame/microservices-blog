const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");

const app = express();
const port = 4002
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// quick example
/*
posts === {
  'ifnavd': {
    id: 'ifnavd',
    title: 'title of post',
    comments: [
      { id: 'fsfsd', content: 'comment!' }
    ]
  }
};
*/

// event handler
// EVERY EVENT has a type and data property
// our react app goes through query service to GET /posts for everything to show to the user
// Query really only cares about POST CREATION events
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    // new posts don't have comments
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    // status of moderation service
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  console.log(posts)

  // if comment was updated, take their attributes and use them (i.e. CommentUpdated is a generic event)
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

// route handler
app.get("/posts", (req, res) => {
  res.send(posts);
});

// route handler
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(port, async () => {
  console.log("Listening on " + port);

  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event at our (query) endpoint:", event.type);

      handleEvent(event.type, event.data);
    }
    
  } catch (error) {
    console.log(error.message);
  }
});


/* REMOVED AFTER ADDING EVENT HANDLER
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(postId + ' (postid) at my query events endpoint')
  console.log(posts);

  // send back an empty post
  res.send({});
});


app.listen(port, () => {
  console.log('Listening on ' + port);
});
*/