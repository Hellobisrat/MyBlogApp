import { useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const response = await axios.post("http://localhost:5000/posts/create", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log("Post created:", response.data);
    alert("Post created successfully!");
  } catch (error) {
    console.error("Failed to create post", error.response?.data || error.message);
  }
  navigate('/')
};

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;