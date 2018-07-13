import { Redis } from 'ioredis'
import { Session } from './Session'

export interface CtxApp {
	session: Session
	sessionID?: string
	redis: Redis
}
