import * as dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { formatArgumentValidationError } from 'type-graphql';

import { startDBConnection } from '@db/startDBConnection';
import { configServer } from '@server/config';
import { cors } from '@server/cors';
import { ctxCallback } from '@server/ctxCallback';
import getSchemas from '@server/getSchemas';

dotenv.config();

/* Start Server */

export const startServer = async (port: number) => {
	const schema = await getSchemas();
	const server = new GraphQLServer({ schema, context: ctxCallback });

	startDBConnection();

	await configServer(server.express);

	const app = await server.start(
		{
			port,
			cors: cors(port),
			debug: false /*process.env.NODE_ENV !== 'production'*/,
			formatError: formatArgumentValidationError
		},
		() => {
			console.log(`Server is running on http://localhost:${port}`);
		}
	);
	return app;
};
