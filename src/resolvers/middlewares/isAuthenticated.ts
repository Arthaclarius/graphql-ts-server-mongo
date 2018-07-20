import { ArgumentValidationError, MiddlewareFn } from 'type-graphql'

import { CtxApp } from '@server/interfaces/CtxApp'
import { LoginErrors } from '@errors/LoginErrors'
import { UserModel } from '@models/User'

export const isAuthenticated: MiddlewareFn = async ({ context }, next) => {
	const userId = (context as CtxApp).session.userId

	if (!userId) {
		throw new ArgumentValidationError(LoginErrors.IsNotAuthenticatedError())
	} else if ((await UserModel.count({ _id: userId })) == 0) {
		throw new ArgumentValidationError(LoginErrors.InvalidLoginError())
	} else {
		return await next()
	}
}
