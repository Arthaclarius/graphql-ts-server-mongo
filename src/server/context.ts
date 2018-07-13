import { ContextCallback } from 'graphql-yoga/dist/types'
import { Redis } from 'ioredis'
import { Session } from './config/Session'
import { redis } from '../config/redis.config'

export type ContextServer = {
	redis: Redis
	session: Session
	sessionID?: string
}

export const getContext: ContextCallback = function getContext({ request }) {
	return {
		redis,
		session: request.session,
		sessionID: request.sessionID
	} as ContextServer
}
