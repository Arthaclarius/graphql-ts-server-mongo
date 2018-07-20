import { Field, InputType } from 'type-graphql'

import { IsEmail } from 'class-validator'
import { PasswordInput } from '@validations/passwordInput'

@InputType()
export class AccountInput extends PasswordInput {
	@Field(() => String)
	@IsEmail()
	email: string
}
