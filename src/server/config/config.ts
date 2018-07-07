import * as express from 'express'

import { sessionServer } from './sessionServer'

export function configServer(e: express.Application) {
	sessionServer(e)
}
