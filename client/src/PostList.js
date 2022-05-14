import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

// PostList will go to Posts service and create 
const PostList = () => {
  // piece of state (of posts)
  const [posts, setPosts] = useState({});   // pass an obkect so it reflects the state of our API

  // async function since we are using the await syntax
  const fetchPosts = async () => {
    // endpoint changed from localhost:4000/posts to localhost:4002/posts when we added the Query Service
    const res = await axios.get("http://localhost:4002/posts");     // pass posts endpoint as path

    // set the data property of response to update setPosts piece of state
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
    // empty array is what tells react to only run this function one time
  }, []);

  // gives an array of all the objects of post objects 
  // return some JSX
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      // return list of all the different post titles
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
    

  return (
    // display renderedPosts
    // return the wrapper of renderedPosts
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
