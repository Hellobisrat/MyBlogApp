import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const db = async()=>{
  console.log('Mongo URI:', process.env.MONGO_URI);
  try {
  await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  console.log('db connected')
  }
  catch(error){
    console.error("❌ Database connection error:", error.message);
    process.exit(1)
  };
}

export default db;


