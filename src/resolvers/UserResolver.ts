import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User, UserModel } from '@models/User'

import { CtxApp } from '@server/interfaces/CtxApp'
import { isAuthenticated } from '@resolvers/middlewares/isAuthenticated'

@Resolver(() => User)
export class UserResolver {
	@Query(() => [ User ])
	async users() {
		return await UserModel.find().select('-password')
	}

	@Query(() => User)
	async findUserById(@Arg('id') id: string) {
		return await UserModel.findById(id).select('-password')
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuthenticated)
	async me(@Ctx() { session }: CtxApp) {
		return await UserModel.findById(session.userId).select('-password')
	}
}
