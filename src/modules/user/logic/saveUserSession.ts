import { ContextServer } from '../../../server/context'
import { userSessionPrefix } from '../../../server/config/redisPrefix'

export async function saveUserSession(userId: string, { session, sessionID, redis }: ContextServer) {
	session.userId = userId
	if (sessionID) {
		await redis.lpush(`${userSessionPrefix}${userId}`, sessionID)
	}
}
