import { Redis } from 'ioredis';

import { ISession } from './Session';

export interface ICtxApp {
	session: ISession;
	sessionID?: string;
	redis: Redis;
}
