import { Field, InputType } from 'type-graphql'

import { Password } from './password'

@InputType()
export class PasswordInput extends Password {
	@Field(() => String)
	password: string
}
