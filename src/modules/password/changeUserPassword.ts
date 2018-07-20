import { Redis } from 'ioredis'
import { RedisPrefix } from '@redis/RedisPrefix'
import { UserModel } from '@models/User'
import { unlockUser } from '@modules/user/unlockUser'

export async function changeUserPassword(newPassword: string, key: string, redis: Redis) {
	const userId = await redis.get(`${RedisPrefix.forgotPassword}${key}`)

	if (userId) {
		await redis.del(key)

		await unlockUser(userId)

		const userDoc = await UserModel.findById(userId)
		if (userDoc) {
			userDoc.password = newPassword
			userDoc.save()
			return true
		}
	}
	return false
}
