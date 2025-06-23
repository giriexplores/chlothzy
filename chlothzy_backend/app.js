import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './utils/dbConnection.js';
import userRoutes from './routes/user.route.js';
import produtRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import { connectCloudinary } from './utils/cloudinary.js';

const app = express();

dotenv.config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser()); //--for accessing cokkies--
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ extended: true }));

//--
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', produtRoutes);
app.use('/api/v1/cart', cartRoutes); 

dbConnection();
connectCloudinary();

export default app;
