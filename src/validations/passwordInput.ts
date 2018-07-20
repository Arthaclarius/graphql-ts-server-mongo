import { Field, InputType } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class PasswordInput {
	@MinLength(6)
	@MaxLength(255)
	@Field(() => String)
	password: string
}
