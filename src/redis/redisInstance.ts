import { Container } from 'typedi';

import { RedisService } from '@redis/RedisService';

export const redisInstance = Container.get(RedisService).redis;
