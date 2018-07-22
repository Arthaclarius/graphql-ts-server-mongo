import * as Redis from 'ioredis';
import { Service } from 'typedi';

@Service()
export class RedisService {
	public redis: Redis.Redis;

	constructor() {
		this.redis = new Redis();
	}
}
