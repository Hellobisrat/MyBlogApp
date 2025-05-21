import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)  
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => console.error("Error fetching post", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/posts/${id}`, { title, description, imageUrl });
      alert("Post updated successfully!");
      navigate("/"); // Redirect back to home page
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <img src={`http://localhost:5000${imageUrl}`} alt="Post Preview" width="200" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;