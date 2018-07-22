import { ValidationError } from 'class-validator';

export class RegisterErrors {
	public static EmailAlreadyTakenError(email: string): ValidationError[] {
		return [
			{
				property: 'email',
				value: email,
				children: [],
				constraints: { email: 'Email already taken' }
			}
		];
	}
}
