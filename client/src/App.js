import React from "react";
import PostCreate from './PostCreate'       // corresponds to src/PostCreate.js
     
const App = () => {
    // (A) initial react project setup
//   return <div>Blog app</div>;
    return <div>
        <h1>Create Post</h1>
        <PostCreate />
    </div>;
};
 
export default App;