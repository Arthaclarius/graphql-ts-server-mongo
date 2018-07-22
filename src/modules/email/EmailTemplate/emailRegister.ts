import { v4 as uuid } from 'uuid';

import { sendEmail } from '@modules/email';
import { redisInstance } from '@redis/redisInstance';
import { RedisPrefix } from '@redis/RedisPrefix';

// Time in Hours
const TIME_EXPIRATION =
	Number(process.env.LINK_TIME_EXPIRATION as string) * 60 * 60;

export default async function confirmRegisterEmail(
	email: string,
	userId: string
) {
	const id = uuid();
	await redisInstance.set(
		`${RedisPrefix.register}${id}`,
		userId,
		'ex',
		TIME_EXPIRATION
	);

	const link = `${process.env.NODE_URL}/api/user/confirm/${id}`;
	sendEmail(email, 'Confirm Account', `<a href="${link}">Confirm</a>`);

	return id;
}
