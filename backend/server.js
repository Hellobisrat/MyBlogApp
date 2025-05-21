import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import postRoutes from './routes/routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const PORT = process.env.PORT;



const app = express();

app.use(express.json());
app.use(cors());
app.use('/posts', postRoutes);
app.use('/uploads', express.static('uploads'))
app.use(errorHandler);



const startServer = async () => {
  await db(); // Ensure DB is connected before listening
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
