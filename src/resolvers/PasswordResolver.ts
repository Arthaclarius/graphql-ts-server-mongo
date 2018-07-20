import { Arg, ArgumentValidationError, Ctx, Mutation, Resolver } from 'type-graphql'

import { CtxApp } from '@server/interfaces/CtxApp'
import { EmailTemplate } from '@modules/email/EmailTemplate'
import { PasswordInput } from '@validations/passwordInput'
import { PasswordModule } from '@modules/password'
import { UserErrors } from '@errors/UserErrors'
import { UserModel } from '@models/User'
import { UserModule } from '@modules/user'

@Resolver()
export class PasswordResolver {
	@Mutation(() => String)
	async sendForgotPassword(@Arg('email') email: string) {
		const userDoc = await UserModel.findOne({ email }).select('id')

		if (!userDoc) {
			throw new ArgumentValidationError(UserErrors.UserNotFound(email))
		}

		await UserModule.lockUser(userDoc.id)
		const link = await EmailTemplate.forgotPasswordEmail(email, userDoc.id.toString())

		return link
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('password') { password }: PasswordInput,
		@Arg('key') key: string,
		@Ctx() { redis }: CtxApp
	) {
		const passwordIsChanged = await PasswordModule.changeUserPassword(password, key, redis)

		return passwordIsChanged
	}
}
