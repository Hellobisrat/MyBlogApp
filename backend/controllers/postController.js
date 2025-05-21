
import Post from "../models/post.js"

 export const getAllPost= async (req,res)=>{
  
   try {
    const posts = await Post.find({});
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json({ message: "Posts retrieved", posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 }
 
 
export const getSinglePost = async(req,res)=>{
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: `No post found with ID ${id}` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
  }

 

 export const likePost =  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();
    res.status(200).json({ message: "Liked!", likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to update likes" });
  }
}

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.unlikes+= 1;
    await post.save();
    res.status(200).json({ message: "Disliked!", dislikes: post.unlikes });
  } catch (error) {
    res.status(500).json({ error: "Failed to update dislikes" });
  }
}

// Handle image upload & post creation
export const createPost = async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const newPost = await Post.create({ title, description, imageUrl });
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

 export const UpdatePost = async(req,res)=>{
    const id = req.params.id;
    try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: `No post found with ID ${id}` });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.imageUrl = req.body.imageUrl || post.imageUrl;

    await post.save();
    res.status(200).json({ message: "Successfully updated", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error });
  }
  }
  


// Delete a post
export const DeletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: `No post found with ID ${id}` });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};