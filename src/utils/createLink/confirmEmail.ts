import * as uuid from 'uuid/v4'

import { Redis } from 'ioredis'
import { sendEmail } from '../emailProvider'

const TIME_EXPIRATION = Number(process.env.LINK_TIME_EXPIRATION as string)

export async function createConfirmEmailLink(email: string, user: string, redis: Redis) {
	const id = uuid()

	await redis.set(id, user, 'ex', 60 * 60 * TIME_EXPIRATION)

	const link = `${process.env.NODE_URL}/api/user/confirm/${id}`
	sendEmail(email, 'Confirm Account', `<a href="${link}">Confirm</a>`)

	return link
}
