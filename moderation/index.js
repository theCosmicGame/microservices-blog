const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 4003
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    // filter out comments that contain 'orange' and emit CommentModerated if rejected or approved
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }
  
  res.send({});
});

app.listen(port, () => {
  console.log('Listening on ' + port);
});
