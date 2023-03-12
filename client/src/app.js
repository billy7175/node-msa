import React from "react";
import PostCraete from "./PostCreate";
import PostList from "./PostList";

export default () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCraete></PostCraete>
      <h2>Post List</h2>
      <PostList></PostList>
    </div>
  );
};
