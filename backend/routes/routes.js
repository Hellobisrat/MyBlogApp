import express from 'express';
import upload from '../middleware/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

import { getAllPost, getSinglePost,  
         UpdatePost, DeletePost,
         createPost,likePost, unlikePost } from '../controllers/postController.js';
import { signup, login } from "../controllers/authController.js";


const router = express.Router();


import mongoose from "mongoose";

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Post ID" });
  }
  next();
};

router.route('/')
      .get(getAllPost)
      .post(authMiddleware,upload.single('image'),createPost)


router.route('/:id')
      .get(validateId,getSinglePost)
      .put(authMiddleware,validateId,UpdatePost)
      .delete(authMiddleware,validateId,DeletePost)

router.put("/like/:id", authMiddleware, validateId, likePost);
router.put("/dislike/:id", authMiddleware, validateId, unlikePost);


router.post("/signup", (req, res, next) => {
  if (req.headers.authorization) {
    return res.status(400).json({ message: "You are already logged in!" });
  }
  next();
}, signup);

router.post("/login", (req, res, next) => {
  if (req.headers.authorization) {
    return res.status(400).json({ message: "You are already logged in!" });
  }
  next();
}, login);



export default router;



