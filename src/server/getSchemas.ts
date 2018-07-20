import { LoginResolver } from '@resolvers/LoginResolver'
import { PasswordResolver } from '@resolvers/PasswordResolver'
import { RegisterResolver } from '@resolvers/RegisterResolver'
import { UserResolver } from '@resolvers/UserResolver'
import { buildSchema } from 'type-graphql'

export default async function getSchemas() {
	const schema = await buildSchema({
		resolvers: [ UserResolver, RegisterResolver, LoginResolver, PasswordResolver ]
	})
	return schema
}
