// tslint:disable-next-line:no-submodule-imports
import { ContextCallback } from 'graphql-yoga/dist/types';

import { redisInstance } from '@redis/redisInstance';
import { ICtxApp } from '@server/interfaces';

export const ctxCallback: ContextCallback = ({ request }) => {
	return {
		redis: redisInstance,
		session: request.session,
		sessionID: request.sessionID
	} as ICtxApp;
};
