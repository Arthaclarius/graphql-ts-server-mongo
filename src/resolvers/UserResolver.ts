import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { User, UserModel } from '@models/User';
import { isAuthenticated } from '@resolvers/middlewares';
import { ICtxApp } from '@server/interfaces';

@Resolver(() => User)
export class UserResolver {
	@Query(() => [ User ])
	public async users() {
		return UserModel.find().select('-password');
	}

	@Query(() => User)
	public async findUserById(@Arg('id') id: string) {
		return UserModel.findById(id).select('-password');
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuthenticated)
	public async me(@Ctx() { session }: ICtxApp) {
		return UserModel.findById(session.userId).select('-password');
	}
}
