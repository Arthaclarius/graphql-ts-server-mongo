import { ValidationError } from 'class-validator'

export namespace RegisterErrors {
	export function EmailAlreadyTakenError(email: string): ValidationError[] {
		return [ { property: 'email', value: email, children: [], constraints: { email: 'Email already taken' } } ]
	}
}
