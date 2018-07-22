import { Arg, ArgumentValidationError, Mutation, Resolver } from 'type-graphql';

import { RegisterErrors } from '@errors/RegisterErrors';
import { UserModel } from '@models/User';
import { RegisterModule } from '@modules/register';
import { AccountInput } from '@validations/accountInput';

@Resolver()
export class RegisterResolver {
	@Mutation(() => String)
	public async register(@Arg('register') { email, password }: AccountInput) {
		const existUser = (await UserModel.findOne({ email }).select('id'))
			? true
			: false;

		if (existUser) {
			throw new ArgumentValidationError(
				RegisterErrors.EmailAlreadyTakenError(email)
			);
		}

		return RegisterModule.registerUser(email, password);
	}

	@Mutation(() => Boolean)
	public async confirmUser(@Arg('id') id: string) {
		const isConfirmed = await RegisterModule.confirmUser(id);
		return isConfirmed;
	}
}
