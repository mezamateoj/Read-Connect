import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import bookRoutes from './routes/bookRoutes';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/books', bookRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
