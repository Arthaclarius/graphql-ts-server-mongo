import { Application } from 'express'
import { configRateLimit } from './configRateLimit'
import { configSession } from './configSession'

export function configServer(e: Application) {
	configSession(e)
	configRateLimit(e)
}
