import { User, UserModel } from '@models/User'

import { RedisPrefix } from '@redis/RedisPrefix'
import { redisInstance } from '@redis/redisInstance'

export async function confirmUser(id: string) {
	const user = await redisInstance.get(`${RedisPrefix.register}${id}`)

	if (user) {
		await redisInstance.del(`${RedisPrefix.register}${id}`)
		await UserModel.findByIdAndUpdate(user, { confirmed: true } as User)

		return { confirm: true }
	} else {
		return { confirm: false }
	}
}
