import { Redis } from 'ioredis'
import { Session } from '@server/interfaces/Session'

export interface CtxApp {
	session: Session
	sessionID?: string
	redis: Redis
}
