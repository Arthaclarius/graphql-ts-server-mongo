import { ArgumentValidationError } from 'type-graphql'
import { ValidationError } from 'class-validator'

export function TestGQLErrors(res: any, errorsExpected: ValidationError[]) {
	expect(res.data).toBeNull()
	const errors = res.errors as ArgumentValidationError[] | undefined

	expect(errors).not.toBeUndefined()
	if (errors) {
		expect(errors[0].validationErrors).toEqual(errorsExpected)
	}
}

export function TestGQLPartialErrors(res: any, properties: string[]) {
	expect(res.data).toBeNull()
	const errors = res.errors as ArgumentValidationError[] | undefined

	expect(errors).not.toBeUndefined()
	if (errors) {
		for (let i = 0; i < errors[0].validationErrors.length; i++) {
			const validationError = errors[0].validationErrors[i]
			if (validationError) {
				expect(validationError.property).toEqual(properties[i])
			}
		}
	}
}
