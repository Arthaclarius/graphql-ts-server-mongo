import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'

import { ContextServer } from '../../../server/context'
import { UserErrors } from '../user.errors'
import { UserModel } from '../user.model'

export const isAuthenticated: MiddlewareFn = async ({ context }, next) => {
	const userId = (context as ContextServer).session.userId

	if (!userId) {
		throw new ArgumentValidationError(UserErrors.IsNotAuthenticatedError())
	} else if ((await UserModel.count({ _id: userId })) == 0) {
		throw new ArgumentValidationError(UserErrors.InvalidLoginError())
	} else {
		return await next()
	}
}
