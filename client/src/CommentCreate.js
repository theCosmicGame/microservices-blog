import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  // create a new piece of state setContent 
  const [content, setContent] = useState("");

  // onSubmit is async function since we need to make a request inside of the function
  const onSubmit = async (event) => {
    event.preventDefault();   // this is a form submission 

    // npm install axious
    // post request
    // pass as argument the endpoint with body of content that is a string 
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {    // note the back ticks
      content,
    });

    // always reset content to default empty string as good practice
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            // whenever user sends input, onChange event listener updates event target value and sets content
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
