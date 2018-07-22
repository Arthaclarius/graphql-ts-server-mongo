import { Application } from 'express';
import * as RateLimit from 'express-rate-limit';
import * as RedisStore from 'rate-limit-redis';

import { redisInstance } from '@redis/redisInstance';

export function configRateLimit(e: Application) {
	const limiter = new RateLimit({
		delayMs: 0,
		max: 100,
		store: new RedisStore({
			client: redisInstance
		}),
		windowMs: 15 * 60 * 1000
	});

	e.use(limiter);
}
