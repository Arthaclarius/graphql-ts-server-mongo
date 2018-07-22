import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PasswordInput {
	@MinLength(6)
	@MaxLength(255)
	@Field(() => String)
	public password: string;
}
