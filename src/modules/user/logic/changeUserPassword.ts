import { User, UserModel } from '../user.model'

import { Redis } from 'ioredis'
import { forgotSessionPrefix } from '../../../server/config/redisPrefix'
import { unlockUser } from './unlockUser'

export async function changeUserPassword(newPassword: string, key: string, redis: Redis) {
	const userId = await redis.get(`${forgotSessionPrefix}${key}`)

	if (userId) {
		await redis.del(key)

		await unlockUser(userId)

		await UserModel.findByIdAndUpdate(userId, { password: await User.hashPassword(newPassword) } as User)
		return true
	} else {
		return false
	}
}
