import { User, UserModel } from '@models/User';
import { redisInstance } from '@redis/redisInstance';
import { RedisPrefix } from '@redis/RedisPrefix';

export async function confirmUser(id: string) {
	const user = await redisInstance.get(`${RedisPrefix.register}${id}`);

	if (user) {
		await redisInstance.del(`${RedisPrefix.register}${id}`);
		await UserModel.findByIdAndUpdate(user, { confirmed: true } as User);

		return { confirm: true };
	} else {
		return { confirm: false };
	}
}
