import { UserResolver } from '../modules/user/user.resolver'
import { buildSchema } from 'type-graphql'

export async function schemas() {
	const schema = await buildSchema({
		resolvers: [ UserResolver ]
	})
	return schema
}
