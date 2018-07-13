import * as dotenv from 'dotenv'

import { GraphQLServer } from 'graphql-yoga'
import { StartDBConnection } from '../config/db.config'
import { configServer } from './config/config'
import { controllers } from './controllers'
import { cors } from './cors'
import { formatArgumentValidationError } from 'type-graphql'
import { getContext } from './context'
import { rateLimit } from './config/rateLimit'
import { schemas } from './schemas'

dotenv.config()

/* Start Server */

export const startServer = async (port: number) => {
	const schema = await schemas()
	const server = new GraphQLServer({ schema, context: getContext })
	await StartDBConnection()

	await configServer(server.express)
	await controllers(server.express)
	rateLimit(server.express)

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
