import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import cors from 'cors';

dotenv.config();

const app = express();

//db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao mongoDB'))
    .catch((err) => console.error('Erro ao conectar ao mongoDB:', err));

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//router middleware
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`O server está rodando na porta ${port}`);
});

//node index.js