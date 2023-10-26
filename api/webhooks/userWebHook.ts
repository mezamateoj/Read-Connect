import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Webhook } from 'svix';

const prisma = new PrismaClient();

const userClerkWebHook = async (req: Request, res: Response) => {
	try {
		console.log('here works');

		const payloadString = JSON.stringify(req.body);
		const svixHeaders = req.headers;

		const wh = new Webhook(process.env.WEEB_HOOK_SECRET!);
		console.log('here works 2');
		// @ts-ignore: Unreachable code error
		const evt = wh.verify(payloadString, svixHeaders);
		console.log('here works 3');
		// @ts-ignore: Unreachable code error
		const { id, ...attributes } = evt.data;
		console.log('here works 4');
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
};

export default userClerkWebHook;
