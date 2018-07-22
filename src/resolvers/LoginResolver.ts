import * as bcrypt from 'bcryptjs';
import { Arg, ArgumentValidationError, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

import { LoginErrors } from '@errors/LoginErrors';
import { User, UserModel } from '@models/User';
import { LoginModule } from '@modules/login';
import { isAuthenticated } from '@resolvers/middlewares';
import { ICtxApp } from '@server/interfaces';
import { AccountInput } from '@validations/accountInput';

@Resolver()
export class LoginResolver {
	@Mutation(() => Boolean)
	public async login(
		@Arg('login') { email, password }: AccountInput,
		@Ctx() ctx: ICtxApp
	) {
		const user = await UserModel.findOne({ email } as User);

		if (!user) {
			throw new ArgumentValidationError(LoginErrors.InvalidLoginError());
		}

		if (!await bcrypt.compare(password, user.password)) {
			throw new ArgumentValidationError(LoginErrors.InvalidLoginError());
		}

		if (!user.confirmed) {
			throw new ArgumentValidationError(LoginErrors.UserNotConfirmedError());
		}

		if (user.locked) {
			throw new ArgumentValidationError(LoginErrors.UserLockedError());
		}

		await LoginModule.saveUserSession(user.id, ctx);

		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	public async logout(@Ctx() { session, redis }: ICtxApp) {
		const { userId } = session;
		if (!userId) {
			return new ArgumentValidationError(
				LoginErrors.LogoutError('No session found')
			);
		}

		await LoginModule.removeUserSessions(userId, redis);

		return true;
	}
}
