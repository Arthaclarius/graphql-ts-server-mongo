import { redisSessionPrefix, userSessionPrefix } from '../../../server/config/redisPrefix'

import { Redis } from 'ioredis'

export async function removeUserSessions(userId: string, redis: Redis) {
	const userIdWithPrefix = `${userSessionPrefix}${userId}`

	const sessionList = (await redis.lrange(userIdWithPrefix, 0, -1)) as string[]
	const sessionListWithPrefix = sessionList.map((session) => {
		return `${redisSessionPrefix}${session}`
	})

	await redis.del(...sessionListWithPrefix, userIdWithPrefix)
}
