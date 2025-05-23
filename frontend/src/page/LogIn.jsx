import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/posts/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;