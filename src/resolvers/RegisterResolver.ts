import { Arg, ArgumentValidationError, Mutation, Resolver } from 'type-graphql'

import { AccountInput } from '@validations/accountInput'
import { RegisterErrors } from '@errors/RegisterErrors'
import { RegisterModule } from '@modules/register'
import { UserModel } from '@models/User'

@Resolver()
export class RegisterResolver {
	@Mutation(() => String)
	async register(@Arg('register') { email, password }: AccountInput) {
		const existUser = (await UserModel.findOne({ email }).select('id')) ? true : false

		if (existUser) {
			throw new ArgumentValidationError(RegisterErrors.EmailAlreadyTakenError(email))
		}

		return await RegisterModule.registerUser(email, password)
	}

	@Mutation(() => Boolean)
	async confirmUser(@Arg('id') id: string) {
		const isConfirmed = await RegisterModule.confirmUser(id)
		return isConfirmed
	}
}
