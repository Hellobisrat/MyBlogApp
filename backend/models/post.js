import mongoose from "mongoose";


const Schema = mongoose.Schema;

const postSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl : {
    type:String,
    required:true
  },
  likes:{
    type:Number,
    default:0

  },
  unlikes: {
    type:Number,
    default:0
  }
},
{timestamps:true})

const Post = mongoose.model("Post",postSchema);

export default Post;