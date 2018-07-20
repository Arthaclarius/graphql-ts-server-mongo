import { CtxApp } from '@server/interfaces/CtxApp'
import { RedisPrefix } from '@redis/RedisPrefix'

export async function saveUserSession(userId: string, { session, sessionID, redis }: CtxApp) {
	session.userId = userId
	if (sessionID) {
		await redis.lpush(`${RedisPrefix.user}${userId}`, sessionID)
	}
}
