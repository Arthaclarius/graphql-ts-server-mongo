import * as connectRedis from 'connect-redis'
import * as express from 'express'
import * as session from 'express-session'

import { RedisPrefix } from '@redis/RedisPrefix'
import { redisInstance } from '@redis/redisInstance'

export function configSession(e: express.Application) {
	const RedisStore = connectRedis(session)
	e.use(
		session({
			name: 'gid',
			secret: process.env.SESSION_SECRET || 'SECRET',
			resave: false,
			saveUninitialized: false,
			store: new RedisStore({ client: redisInstance as any, prefix: RedisPrefix.session }),
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
			}
		})
	)
}
