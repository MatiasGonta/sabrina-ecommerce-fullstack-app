import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { orderRouter, productRouter, seedRouter, userRouter } from './routes';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL ||  'mongodb://localhost/fym-indumentaria';
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
    .then(()=> console.log('connected to mongodb'))
    .catch(()=> console.log('error mongodb'));

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173'],
    })
);

// app.get('/api/products', (req: Request, res: Response) => {
//     res.json(sampleProducts);
// });

// app.get('/api/products/:slug', (req: Request, res: Response) => {
//     res.json(sampleProducts.find(x => x.slug === req.params.slug));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
});