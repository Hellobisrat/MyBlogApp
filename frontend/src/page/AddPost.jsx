import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  if (!user) {
   <div>
      <h2 className="text-center text-red-500">Please log in to add a post.</h2>
      <button onClick={() => navigate("/login")} className="bg-blue-500 text-white p-2 rounded">
        Go to Login
      </button>
    </div>

  };

  const [Loading,setLoading] =useState(false)

  const handleFileChange = (e) => {
  if (!e.target.files.length) {
    alert("Please select an image file!");
    return;
  }
  setImage(e.target.files[0]);
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if(!title || !description || !image)
  {
    alert("All fields are required!");
    return;
  }
  setLoading(true)
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const response = await axios.post("http://localhost:5000/posts/create", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

    });
    console.log("Post created:", response.data);
    alert("Post created successfully!");
    navigate('/')
  } catch (error) {
    console.error("Failed to create post", error.response?.data || error.message);
  }
  setLoading(false)
};

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" disabled={Loading}>
          {Loading ? "Submitting...":"Submit"}
          </button>
      </form>
    </div>
  );
};

export default AddPost;