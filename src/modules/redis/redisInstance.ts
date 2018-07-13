import { Container } from 'typedi'
import { RedisService } from './RedisService'

export const redisInstance = Container.get(RedisService).redis
