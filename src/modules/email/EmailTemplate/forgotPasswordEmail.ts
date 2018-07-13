import * as uuid from 'uuid/v4'

import { RedisPrefix } from '../../redis/redisPrefix'
import { redisInstance } from '../../redis/RedisInstance'
import { sendEmail } from '../sendEmail'

// Time in Minutes
const TIME_EXPIRATION = Number(process.env.LINK_TIME_FORGOT_PASSWORD as string) * 60

export default async function forgotPasswordEmail(email: string, user: string) {
	const id = uuid()

	await redisInstance.set(`${RedisPrefix.forgotPassword}${id}`, user, 'ex', TIME_EXPIRATION)

	const link = `${process.env.NODE_URL}/forgotPassword/${id}`

	sendEmail(email, 'Confirm Account', `<a href="${link}">Confirm</a>`)

	return link
}
