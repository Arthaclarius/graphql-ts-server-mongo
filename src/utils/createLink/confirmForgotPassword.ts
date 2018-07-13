import * as uuid from 'uuid/v4'

import { Redis } from 'ioredis'
import { sendEmail } from '../emailProvider'

const TIME_EXPIRATION = Number(process.env.LINK_TIME_FORGOTPASSWORD as string)

export async function createForgotPasswordLink(email: string, user: string, redis: Redis, prefix: string) {
	const id = uuid()

	await redis.set(`${prefix}${id}`, user, 'ex', 60 * TIME_EXPIRATION)

	const link = `${process.env.NODE_URL}/forgotPassword/${id}`

	sendEmail(email, 'Confirm Account', `<a href="${link}">Confirm</a>`)

	return link
}
