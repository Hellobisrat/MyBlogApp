import express from 'express';
import upload from '../middleware/upload.js';
import { getAllPost, getSinglePost,  
         UpdatePost, DeletePost,
         createPost,likePost, unlikePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
      .get(getAllPost)
      .post(upload.single('image'),createPost)


router.route('/:id')
      .get(getSinglePost)
      .put(UpdatePost)
      .delete(DeletePost)

router.put("/like/:id",likePost);

router.put("/dislike/:id", unlikePost );

export default router;



