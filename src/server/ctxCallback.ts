import { ContextCallback } from 'graphql-yoga/dist/types'
import { CtxApp } from '@server/interfaces/CtxApp'
import { redisInstance } from '@redis/redisInstance'

export const ctxCallback: ContextCallback = function({ request }) {
	return {
		session: request.session,
		sessionID: request.sessionID,
		redis: redisInstance
	} as CtxApp
}
