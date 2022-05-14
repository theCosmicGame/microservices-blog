const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  console.log('here')
  res.send(posts);  // send back all the posts that have been created
});

app.post('/posts', (req, res) => {
    // create a randomly generated id for each new post a user creates
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;   // POST method of posts service requires the body have a { title: string }


  posts[id] = {
    id,
    title
  };

  // you create a RESOURCE by calling res.status(201)
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});