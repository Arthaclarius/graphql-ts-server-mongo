import * as connectRedis from 'connect-redis'
import * as express from 'express'
import * as session from 'express-session'

import { redis } from '../../config/redis.config'
import { redisSessionPrefix } from './redisPrefix'

export function sessionServer(e: express.Application) {
	const RedisStore = connectRedis(session)
	e.use(
		session({
			name: 'gid',
			secret: process.env.SESSION_SECRET || 'SECRET',
			resave: true,
			saveUninitialized: false,
			store: new RedisStore({ client: redis as any, prefix: redisSessionPrefix }),
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
			}
		})
	)
}
