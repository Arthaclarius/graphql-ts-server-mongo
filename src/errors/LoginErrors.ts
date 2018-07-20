import { ValidationError } from 'class-validator'

export namespace LoginErrors {
	export function InvalidLoginError(): ValidationError[] {
		return [ { property: 'login', value: '', children: [], constraints: { login: 'Invalid login' } } ]
	}
	export function UserNotConfirmedError(): ValidationError[] {
		return [
			{ property: 'confirmed', value: false, children: [], constraints: { confirmed: 'User is not confirmed' } }
		]
	}
	export function UserLockedError(): ValidationError[] {
		return [ { property: 'locked', value: true, children: [], constraints: { confirmed: 'User is locked' } } ]
	}

	export function IsNotAuthenticatedError(): ValidationError[] {
		return [ { property: 'login', value: null, children: [], constraints: { login: 'Is not Authenticated' } } ]
	}
	export function LogoutError(err: any): ValidationError[] {
		return [ { property: 'logout', value: err, children: [], constraints: { logout: 'Error on the Logout' } } ]
	}
}
