import * as bcrypt from 'bcryptjs'

import { Arg, ArgumentValidationError, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { User, UserModel } from '@models/User'

import { AccountInput } from '@validations/accountInput'
import { CtxApp } from '@server/interfaces/CtxApp'
import { LoginErrors } from '@errors/LoginErrors'
import { LoginModule } from '@modules/login'
import { isAuthenticated } from '@resolvers/middlewares/isAuthenticated'

@Resolver()
export class LoginResolver {
	@Mutation(() => Boolean)
	async login(@Arg('login') { email, password }: AccountInput, @Ctx() ctx: CtxApp) {
		const user = await UserModel.findOne({ email } as User)

		if (!user) {
			throw new ArgumentValidationError(LoginErrors.InvalidLoginError())
		}

		if (!await bcrypt.compare(password, user.password)) {
			throw new ArgumentValidationError(LoginErrors.InvalidLoginError())
		}

		if (!user.confirmed) {
			throw new ArgumentValidationError(LoginErrors.UserNotConfirmedError())
		}

		if (user.locked) {
			throw new ArgumentValidationError(LoginErrors.UserLockedError())
		}

		await LoginModule.saveUserSession(user.id, ctx)

		return true
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	async logout(@Ctx() { session, redis }: CtxApp) {
		const { userId } = session
		if (!userId) {
			return new ArgumentValidationError(LoginErrors.LogoutError('No session found'))
		}

		await LoginModule.removeUserSessions(userId, redis)

		return true
	}
}
