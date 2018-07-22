import { Arg, ArgumentValidationError, Ctx, Mutation, Resolver } from 'type-graphql';

import { UserErrors } from '@errors/UserErrors';
import { UserModel } from '@models/User';
import { EmailTemplate } from '@modules/email';
import { PasswordModule } from '@modules/password';
import { UserModule } from '@modules/user';
import { ICtxApp } from '@server/interfaces';
import { PasswordInput } from '@validations/passwordInput';

@Resolver()
export class PasswordResolver {
	@Mutation(() => String)
	public async sendForgotPassword(@Arg('email') email: string) {
		const userDoc = await UserModel.findOne({ email }).select('id');

		if (!userDoc) {
			throw new ArgumentValidationError(UserErrors.UserNotFound(email));
		}

		await UserModule.lockUser(userDoc.id);
		const link = await EmailTemplate.forgotPasswordEmail(
			email,
			userDoc.id.toString()
		);

		return link;
	}

	@Mutation(() => Boolean)
	public async forgotPassword(
		@Arg('password') { password }: PasswordInput,
		@Arg('key') key: string,
		@Ctx() { redis }: ICtxApp
	) {
		const passwordIsChanged = await PasswordModule.changeUserPassword(
			password,
			key,
			redis
		);

		return passwordIsChanged;
	}
}
