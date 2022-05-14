import React from "react";
import PostCreate from './PostCreate'       // corresponds to src/PostCreate.js
import PostList from './PostList'
     
const App = () => {
    // (A) initial react project setup
//   return <div>Blog app</div>;
    return (
    <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
    </div>
    );
};
 
export default App;