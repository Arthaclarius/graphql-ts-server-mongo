import { ValidationError } from 'class-validator'

export namespace UserErrors {
	export function UserNotFound(email: string): ValidationError[] {
		return [ { property: 'email', value: email, children: [], constraints: { email: 'User not found' } } ]
	}
}
