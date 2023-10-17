import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { keyRouter, orderRouter, productRouter, seedRouter, userRouter } from './routes';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Nodemailer config
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    },
    tls: {
        // Permitir certificados autofirmados
        rejectUnauthorized: false
    }
});

transporter.verify().then(
    () => console.log("Server is ready to take our messages")
);

// MongoDB config
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/fym-indumentaria';
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
    .then(() => console.log('connected to mongodb'))
    .catch((e) => console.log('error mongodb', e));

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173'],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/keys', keyRouter);

export const PORT: number = parseInt((process.env.PORT || '4000') as string, 10);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
});