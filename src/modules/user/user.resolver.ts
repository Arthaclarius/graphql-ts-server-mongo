import * as bcrypt from 'bcryptjs'

import { Arg, ArgumentValidationError, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User, UserModel } from './user.model'

import { AccountInput } from './types/accountInput'
import { CtxApp } from '../server/interfaces/CtxApp'
import { EmailTemplate } from '../email/emailTemplate'
import { PasswordInput } from './types/passwordInput'
import { UserErrors } from './user.errors'
import { UserLogic } from './logic'
import { isAuthenticated } from './middlewares/isAuthenticated'

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

	@Mutation(() => User)
	async register(@Arg('register') { email, password }: AccountInput) {
		const existUser = (await UserModel.findOne({ email }).select('id')) ? true : false

		if (existUser) {
			throw new ArgumentValidationError(UserErrors.EmailAlreadyTakenError(email))
		}

		return await UserLogic.registerUser(email, password)
	}

	@Mutation(() => Boolean)
	async login(@Arg('login') { email, password }: AccountInput, @Ctx() ctx: CtxApp) {
		const user = await UserModel.findOne({ email } as User)

		if (!user) {
			throw new ArgumentValidationError(UserErrors.InvalidLoginError())
		}

		if (!await bcrypt.compare(password, user.password)) {
			console.dir(UserErrors.InvalidLoginError())
			throw new ArgumentValidationError(UserErrors.InvalidLoginError())
		}

		if (!user.confirmed) {
			throw new ArgumentValidationError(UserErrors.UserNotConfirmedError())
		}

		if (user.locked) {
			throw new ArgumentValidationError(UserErrors.UserLockedError())
		}

		await UserLogic.saveUserSession(user.id, ctx)

		return true
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	async logout(@Ctx() { session, redis }: CtxApp) {
		const { userId } = session
		if (!userId) {
			return new ArgumentValidationError(UserErrors.LogoutError('No session found'))
		}

		await UserLogic.removeUserSessions(userId, redis)

		return true
	}

	@Mutation(() => String)
	async sendForgotPassword(@Arg('email') email: string) {
		const userDoc = await UserModel.findOne({ email }).select('id')

		if (!userDoc) {
			throw new ArgumentValidationError(UserErrors.UserNotFound(email))
		}

		await UserLogic.lockUser(userDoc.id)
		const link = await EmailTemplate.forgotPasswordEmail(email, userDoc.id.toString())

		return link
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('password') { password }: PasswordInput,
		@Arg('key') key: string,
		@Ctx() { redis }: CtxApp
	) {
		const passwordIsChanged = await UserLogic.changeUserPassword(password, key, redis)

		return passwordIsChanged
	}
}
