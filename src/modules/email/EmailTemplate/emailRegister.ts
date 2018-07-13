import * as uuid from 'uuid/v4'

import { RedisPrefix } from '../../redis/redisPrefix'
import { redisInstance } from '../../redis/RedisInstance'
import { sendEmail } from '../sendEmail'

// Time in Hours
const TIME_EXPIRATION = Number(process.env.LINK_TIME_EXPIRATION as string) * 60 * 60

export default async function confirmRegisterEmail(email: string, userId: string) {
	const id = uuid()
	await redisInstance.set(`${RedisPrefix.register}${id}`, userId, 'ex', TIME_EXPIRATION)

	const link = `${process.env.NODE_URL}/api/user/confirm/${id}`
	sendEmail(email, 'Confirm Account', `<a href="${link}">Confirm</a>`)

	return link
}
