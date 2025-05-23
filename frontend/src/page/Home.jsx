import {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import {AuthContext} from '../context/AuthContext.jsx'

const Home = () => {
  const [posts,setPosts]=useState([])
  
  
  
 const fetchPosts =()=>{
  axios.get("http://localhost:5000/posts") // Check this URL
    .then((res) =>{

       setPosts(res.data.posts)
        localStorage.setItem("token", res.data.token);
    })
    // Ensure API response structure matches
    .catch((err) => console.error("Error fetching posts", err));
  
} 

useEffect(() => {
  fetchPosts();
}, []);



  const handleDelete= async(id)=>{
      await axios.delete(`http://localhost:5000/posts/${id}`)
      const newpost = posts.filter((posts)=>posts._id!==id)
      setPosts(newpost);

      
  }
  const handleLike = async (id) => {
  try {
    const response = await axios.put(`http://localhost:5000/posts/like/${id}`);
    setPosts(posts.map(post => post._id === id ? { ...post, likes: response.data.likes } : post));
  } catch (error) {
    console.error("Error updating likes", error);
  }
};

const handleDislike = async (id) => {
  try {
    const response = await axios.put(`http://localhost:5000/posts/dislike/${id}`);

    setPosts(posts.map(post => post._id === id ? { ...post, dislikes: response.data.unlikes } : post));
  } catch (error) {
    console.error("Error updating dislikes", error);
  }
};

  const { user } = useContext(AuthContext);
  console.log(localStorage.getItem("user"));


  
 
  return (
    < div className='bg-black' >
     <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
     <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded mx-2">Login</Link>
     
      {user ? (
        <h2 className="text-white text-center">Welcome, {user.name}! 👋</h2>
      ) : (
        <h2 className="text-white text-center">Please log in.</h2>
      )}
    

      <h1 className='text-3xl text-red-700   text-center bg-slate-300 p-6 border rounded'>Blog Post</h1>
      <div></div>
      <Link to='/add-post' className=' inline-block bg-slate-200 shadow-xl rounded py-2 px-4 m-2  hover:bg-red-500 '>Add Post</Link>
      <div className='grid md:grid-cols-4 gap-4 bg-slate-100'>
      {posts.map(post=>(
        
        <div key={post._id}  className='border p-3  border-red-100 rounded mb-3 p-6 shadow-xl relative'>
          <h2 className='text-lg text-slate-900 font-bold mb-2 text-center'>{post.title}</h2>
          
          <img src={`http://localhost:5000${post.imageUrl}`} alt="Post"  className='w-[200] mt-2 flex-cols flex-1' />
          <p className='text-sm text-slate-600 '>{post.description}...</p>
          <Link to={`/posts/${post._id}`} className='bg-blue-700 text-white rounded-full  px-2 py-1 inline-block mt-4'>View details</Link>
         <Link to={`/edit/${post._id}`} className="bg-yellow-500 text-white rounded-full px-2 py-1 inline-block mt-4 mx-4">
              Edit Post
          </Link>
          <button  className='mx-4 bg-red-800 text-black px-2 py-1 rounded-full inline-block my-2 ' onClick={()=>handleDelete(post._id)}>Delete</button>
          <div className='absolute top-0 right-0 flex flex-col gap-2 mt-2 '>
          <div className='bg-blue-100 rounded-full p-1 flex justify-center gap-1 text-sm' onClick={() => handleLike(post._id)}><ThumbUpIcon className="w-0.5 h-[10px] scale-25 text-xs "/>{post.likes}</div>
          <div className='bg-blue-100 rounded-full p-1 flex justify-center gap-1 'onClick={() => handleDislike(post._id)}><ThumbDownAltIcon className="w-0.5 h-0.5 scale-25 "/>{post.unlikes}</div>
          </div>
          
          </div>
          
         

      ))} </div>
    </div>
  )
}

export default Home