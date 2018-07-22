declare module 'rate-limit-redis' {
	import { Redis } from 'ioredis';
	import { Store } from 'express-rate-limit';

	namespace RateLimitRedis {
		export type RedisStoreConfiguration = {
			expiry?: number;
			resetExpiryOnChange?: boolean;
			prefix?: string;
			client?: Redis;
		};
	}

	var RateLimitRedis: new (
		configuration: RateLimitRedis.RedisStoreConfiguration
	) => Store;
	export = RateLimitRedis;
}
