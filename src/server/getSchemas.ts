import { buildSchema } from 'type-graphql';

import { LoginResolver } from '@resolvers/LoginResolver';
import { PasswordResolver } from '@resolvers/PasswordResolver';
import { RegisterResolver } from '@resolvers/RegisterResolver';
import { UserResolver } from '@resolvers/UserResolver';

export default async function getSchemas() {
	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			RegisterResolver,
			LoginResolver,
			PasswordResolver
		]
	});
	return schema;
}
