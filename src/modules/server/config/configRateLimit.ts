import * as RateLimit from 'express-rate-limit'
import * as RedisStore from 'rate-limit-redis'

import { Application } from 'express'
import { redisInstance } from '../../redis/RedisInstance'

export function configRateLimit(e: Application) {
	const limiter = new RateLimit({
		store: new RedisStore({
			client: redisInstance
		}),
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
		delayMs: 0 // disable delaying - full speed until the max limit is reached
	})

	e.use(limiter)
}
