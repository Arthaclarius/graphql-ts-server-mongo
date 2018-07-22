import { RedisPrefix } from '@redis/RedisPrefix';
import { ICtxApp } from '@server/interfaces';

export async function saveUserSession(
	userId: string,
	{ session, sessionID, redis }: ICtxApp
) {
	session.userId = userId;
	if (sessionID) {
		await redis.lpush(`${RedisPrefix.user}${userId}`, sessionID);
	}
}
