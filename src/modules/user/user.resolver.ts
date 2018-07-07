import * as bcrypt from 'bcryptjs'

import { Arg, ArgumentValidationError, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User, UserModel } from './user.model'

import { AccountInput } from './types/accountInput'
import { ContextServer } from '../../server/context'
import { PasswordInput } from './types/passwordInput'
import { UserErrors } from './user.errors'
import { createForgotPasswordLink } from '../../utils/createLink/confirmForgotPassword'
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
	async me(@Ctx() { session }: ContextServer) {
		return await UserModel.findById(session.userId).select('-password')
	}

	@Mutation(() => User)
	async register(@Arg('register') { email, password }: AccountInput) {
		const existUser = (await UserModel.findOne({ email }).select('id')) ? true : false

		if (existUser) {
			throw new ArgumentValidationError(UserErrors.EmailAlreadyTakenError(email))
		}

		const user = new User()
		user.email = email
		user.password = password

		const userDoc = new UserModel(user)
		await userDoc.save()

		// await createConfirmEmailLink(email, userDoc.id, redis)

		return userDoc
	}

	@Mutation(() => Boolean)
	async login(@Arg('login') { email, password }: AccountInput, @Ctx() { session, redis, req }: ContextServer) {
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

		if (!session.userId) {
			session.userId = user.id
			if (req.sessionID) {
				await redis.lpush(user.id, req.sessionID)
			}
		}

		return true
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuthenticated)
	async logout(@Ctx() { session }: ContextServer) {
		return await new Promise((res) =>
			session.destroy((err) => {
				if (err) {
					throw new ArgumentValidationError(UserErrors.LogoutError(err))
				}
				res(true)
			})
		)
	}

	@Mutation(() => String)
	async sendForgotPassword(@Arg('email') email: string, @Ctx() { redis }: ContextServer) {
		const userDoc = await UserModel.findOne({ email }).select('id')

		if (!userDoc) {
			throw new ArgumentValidationError(UserErrors.UserNotFound(email))
		}

		const link = await createForgotPasswordLink(email, userDoc.id.toString(), redis)

		return link
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('password') { password }: PasswordInput,
		@Arg('id') id: string,
		@Ctx() { redis }: ContextServer
	) {
		const user = await redis.get(id)

		if (user) {
			await redis.del(id)
			await UserModel.findByIdAndUpdate(user, { password: await User.hashPassword(password) } as User)
			return true
		} else {
			return false
		}
	}
}
