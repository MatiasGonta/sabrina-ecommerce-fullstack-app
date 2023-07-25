import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { keyRouter, orderRouter, productRouter, seedRouter, userRouter } from './routes';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL ||  'mongodb://localhost/fym-indumentaria';
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
    .then(()=> console.log('connected to mongodb'))
    .catch((e)=> console.log('error mongodb', e));

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

// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')))

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
});