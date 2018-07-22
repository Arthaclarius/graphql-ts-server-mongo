import { ArgumentValidationError, MiddlewareFn } from 'type-graphql';

import { LoginErrors } from '@errors/LoginErrors';
import { UserModel } from '@models/User';
import { ICtxApp } from '@server/interfaces';

export const isAuthenticated: MiddlewareFn = async ({ context }, next) => {
	const userId = (context as ICtxApp).session.userId;

	if (!userId) {
		throw new ArgumentValidationError(LoginErrors.IsNotAuthenticatedError());
	} else if ((await UserModel.count({ _id: userId })) === 0) {
		throw new ArgumentValidationError(LoginErrors.InvalidLoginError());
	} else {
		return next();
	}
};
