import { Redis } from 'ioredis';

import { RedisPrefix } from '@redis/RedisPrefix';

export async function removeUserSessions(userId: string, redis: Redis) {
	const userIdWithPrefix = `${RedisPrefix.user}${userId}`;

	const sessionList = (await redis.lrange(userIdWithPrefix, 0, -1)) as string[];
	const sessionListWithPrefix = sessionList.map((session) => {
		return `${RedisPrefix.session}${session}`;
	});

	await redis.del(...sessionListWithPrefix, userIdWithPrefix);
}
