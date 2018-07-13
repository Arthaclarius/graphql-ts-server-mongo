import { UserResolver } from '../user/user.resolver'
import { buildSchema } from 'type-graphql'

export default async function getSchemas() {
	const schema = await buildSchema({
		resolvers: [ UserResolver ]
	})
	return schema
}
