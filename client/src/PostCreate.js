import React, { useState } from "react";
import axios from "axios";

 
const PostCreate = () => {
  // declare new piece of state (of string) using useState hook
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // ties out to testing the API with POST @ localhost:4000/posts and body needing a title
    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          {/* onChange event handler will make a post request to the API - any submission event e, call set setTitle with e.target.value */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};


export default PostCreate;
