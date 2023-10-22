import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import {
	ClerkExpressRequireAuth,
	ClerkExpressWithAuth,
	RequireAuthProp,
	StrictAuthProp,
} from '@clerk/clerk-sdk-node';

import bookRoutes from './routes/bookRoutes';
import reviewsRoutes from './routes/reviewsRoutes';

const PORT = process.env.PORT || 8000;

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends StrictAuthProp {}
	}
}

import { NextFunction } from 'express';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';

import bodyParser from 'body-parser';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/reviews', reviewsRoutes);

// app.use('/reviews/:bookId', ClerkExpressWithAuth());

// app.post(
// 	'/reviews/:bookId',
// 	// ClerkExpressRequireAuth(),
// 	(req: RequireAuthProp<Request>, res: Response) => {
// 		console.log(req);

// 		try {

// 			res.status(200).json({
// 				status: 'success',
// 				data: req,
// 				message: 'You are authenticated!',
// 			});
// 		} catch (error: any) {
// 			console.log(error.message);
// 		}
// 	}
// );

const prisma = new PrismaClient();

app.post(
	'/clerk/webhook',
	bodyParser.json(),
	bodyParser.raw({ type: 'application/json' }),
	async function (req, res) {
		try {
			const payloadString = JSON.stringify(req.body);
			const svixHeaders = req.headers;

			const wh = new Webhook(process.env.WEEB_HOOK_SECRET!);
			// @ts-ignore: Unreachable code error
			const evt = wh.verify(payloadString, svixHeaders);
			// @ts-ignore: Unreachable code error
			const { id, ...attributes } = evt.data;
			// Handle the webhooks
			// @ts-ignore: Unreachable code error
			const eventType = evt.type;
			if (eventType === 'user.created') {
				console.log(`User ${id} was ${eventType}`);

				const email = attributes.email_addresses[0].email_address;

				await prisma.user.create({
					data: {
						clerkId: id,
						email: email,
						name: attributes.firstName,
					},
				});
			}
			res.status(200).json({
				success: true,
				message: 'Webhook received',
			});
		} catch (err: any) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}
);

app.use((err: any, req: any, res: any, next: NextFunction) => {
	console.error(err.stack);
	res.status(401).send('You must be logged in to view this page');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
