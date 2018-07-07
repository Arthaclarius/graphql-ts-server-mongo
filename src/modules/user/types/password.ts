import { MaxLength, MinLength } from 'class-validator'

export class Password {
	@MinLength(6)
	@MaxLength(255)
	password: string
}
