import { ValidationError } from 'class-validator';

export class UserErrors {
	public static UserNotFound(email: string): ValidationError[] {
		return [
			{
				property: 'email',
				value: email,
				children: [],
				constraints: { email: 'User not found' }
			}
		];
	}
}
