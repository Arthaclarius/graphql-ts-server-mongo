import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { PasswordInput } from '@validations/passwordInput';

@InputType()
export class AccountInput extends PasswordInput {
	@Field(() => String)
	@IsEmail()
	public email: string;
}
