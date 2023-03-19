const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };

    console.log("After post created");
    console.log(posts);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    console.log("### COMMENTCREATED");
    console.log(posts, postId);
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.contnet = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("event-bus /events");
  console.log("Comment,", req.body);
  const { type, data } = req.body;
  handleEvent(type, data);
  console.log("#Posts");
  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");

    console.log(res.data);
    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
