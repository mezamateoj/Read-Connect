import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import bookRoutes from './routes/bookRoutes';
import reviewsRoutes from './routes/reviewsRoutes';
import readingListRoutes from './routes/readingListRoutes';
import bodyParser from 'body-parser';
import userClerkWebHook from './webhooks/userWebHook';

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/reading-list', readingListRoutes);

app.post(
	'/clerk/webhook',
	bodyParser.raw({ type: 'application/json' }),
	userClerkWebHook
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
