import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Home from './page/Home';
import AddPost from './page/AddPost';
import PostDetails from './page/PostDetails';
import EditPost from './page/EditPost';
import Signup from './page/SignUp';
import Login from './page/LogIn';
function App() {
  return (
    <AuthProvider>
      <Router>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-post' element={<AddPost/>}/>
      <Route path='/posts/:id' element={<PostDetails/>}/>
      <Route path='/edit/:id' element={<EditPost />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />



    </Routes>
     </Router>
    </AuthProvider>
   
  
    
  );
}

export default App;
