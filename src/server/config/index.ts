import { Application } from 'express'
import { configRateLimit } from '@server/config/configRateLimit'
import { configSession } from '@server/config/configSession'

export function configServer(e: Application) {
	configSession(e)
	configRateLimit(e)
}
