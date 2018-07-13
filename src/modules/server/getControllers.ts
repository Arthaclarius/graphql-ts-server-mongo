import * as bodyParser from 'body-parser'

import { Application } from 'express'
import { UserController } from '../user/user.controller'
import { useExpressServer } from 'routing-controllers'

export async function getControllers(e: Application) {
	e.use(bodyParser.urlencoded({ extended: true, limit: '2mb', parameterLimit: 50 }))
	e.use(bodyParser.json({ limit: '50mb' }))
	useExpressServer(e, {
		routePrefix: '/api',
		controllers: [ UserController ]
	})
}
