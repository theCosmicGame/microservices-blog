import React, { useState, useEffect } from "react";
import axios from "axios";

// postId as the property
const CommentList = ({ postId }) => {
  // setComments piece of state
  const [comments, setComments] = useState([]);   // NOTE!!! different from PostList which passes an object, not an array. all depends on what API sends us

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    setComments(res.data);
  };

  // call fetch data within use effect
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
