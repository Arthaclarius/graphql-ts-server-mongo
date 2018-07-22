import { ValidationError } from 'class-validator';

export class LoginErrors {
	public static InvalidLoginError(): ValidationError[] {
		return [
			{
				property: 'login',
				value: '',
				children: [],
				constraints: { login: 'Invalid login' }
			}
		];
	}
	public static UserNotConfirmedError(): ValidationError[] {
		return [
			{
				property: 'confirmed',
				value: false,
				children: [],
				constraints: { confirmed: 'User is not confirmed' }
			}
		];
	}
	public static UserLockedError(): ValidationError[] {
		return [
			{
				property: 'locked',
				value: true,
				children: [],
				constraints: { confirmed: 'User is locked' }
			}
		];
	}

	public static IsNotAuthenticatedError(): ValidationError[] {
		return [
			{
				property: 'login',
				value: null,
				children: [],
				constraints: { login: 'Is not Authenticated' }
			}
		];
	}
	public static LogoutError(err: any): ValidationError[] {
		return [
			{
				property: 'logout',
				value: err,
				children: [],
				constraints: { logout: 'Error on the Logout' }
			}
		];
	}
}
