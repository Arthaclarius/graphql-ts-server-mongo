import { IsEmail } from 'class-validator'
import { Password } from './password'

export class Account extends Password {
	@IsEmail() email: string
}
