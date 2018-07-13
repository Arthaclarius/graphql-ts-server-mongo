import { ContextCallback } from 'graphql-yoga/dist/types'
import { CtxApp } from './interfaces/CtxApp'
import { redisInstance } from '../redis/RedisInstance'

export const ctxCallback: ContextCallback = function({ request }) {
	return {
		session: request.session,
		sessionID: request.sessionID,
		redis: redisInstance
	} as CtxApp
}
