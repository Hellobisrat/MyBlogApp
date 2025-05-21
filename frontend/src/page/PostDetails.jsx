import { useState, useEffect } from "react";
import axios from "axios";
import { Links, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post", err));
  }, [id]);

  return (
    <div>
      <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <img src={`http://localhost:5000${post.imageUrl}`} alt="Post" width="200" />
        </>
      ) : (
        <p>Loading post...</p>
      )}
      
    </div>
    <Links to='/'>Back to Home</Links></div>
    
  );
};

export default PostDetails;