import { ValidationError } from 'class-validator'

export namespace UserErrors {
	export function EmailAlreadyTakenError(email: string): ValidationError[] {
		return [ { property: 'email', value: email, children: [], constraints: { email: 'Email already taken' } } ]
	}
	export function InvalidLoginError(): ValidationError[] {
		return [ { property: 'login', value: '', children: [], constraints: { login: 'Invalid login' } } ]
	}
	export function UserNotConfirmedError(): ValidationError[] {
		return [
			{ property: 'confirmed', value: false, children: [], constraints: { confirmed: 'User is not confirmed' } }
		]
	}
	export function IsNotAuthenticatedError(): ValidationError[] {
		return [ { property: 'login', value: null, children: [], constraints: { login: 'Is not Authenticated' } } ]
	}
	export function LogoutError(err: any): ValidationError[] {
		return [ { property: 'logout', value: err, children: [], constraints: { logout: 'Error on the Logout' } } ]
	}
	export function UserNotFound(email: string): ValidationError[] {
		return [ { property: 'email', value: email, children: [], constraints: { email: 'User not found' } } ]
	}
}
