import * as bodyParser from 'body-parser'

import { Application } from 'express'
import { UserController } from '../modules/user/user.controller'
import { useExpressServer } from 'routing-controllers'

export async function controllers(e: Application) {
	e.use(bodyParser.urlencoded({ extended: true, limit: '2mb', parameterLimit: 50 }))
	e.use(bodyParser.json({ limit: '50mb' }))
	useExpressServer(e, {
		routePrefix: '/api',
		controllers: [ UserController ]
	})
}
