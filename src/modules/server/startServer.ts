import * as dotenv from 'dotenv'

import { GraphQLServer } from 'graphql-yoga'
import { configServer } from './config'
import { cors } from './cors'
import { ctxCallback } from './ctxCallback'
import { formatArgumentValidationError } from 'type-graphql'
import { getControllers } from './getControllers'
import getSchemas from './getSchemas'
import { startDBConnection } from '../db/startDBConnection'

dotenv.config()

/* Start Server */

export const startServer = async (port: number) => {
	const schema = await getSchemas()
	const server = new GraphQLServer({ schema, context: ctxCallback })

	await startDBConnection()

	await configServer(server.express)

	await getControllers(server.express)

	const app = await server.start(
		{
			port,
			cors: cors(port),
			debug: false /*process.env.NODE_ENV !== 'production'*/,
			formatError: formatArgumentValidationError
		},
		() => console.log(`Server is running on http://localhost:${port}`)
	)
	return app
}
