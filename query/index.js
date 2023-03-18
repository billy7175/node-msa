const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("event-bus /events");
  console.log("Comment,", req.body);
  const { type, data } = req.body;
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

  if(type === 'CommentUpdated'){
    const { id, postId, content, status} = data
    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    })

    comment.status = status
    comment.contnet = content
  }
  console.log("#Posts");
  console.log(posts);
  res.send({});
});

app.listen("4002", () => {
  console.log("Query is running on 4002");
});
