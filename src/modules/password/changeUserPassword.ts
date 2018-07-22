import { Redis } from 'ioredis';

import { UserModel } from '@models/User';
import { UserModule } from '@modules/user';
import { RedisPrefix } from '@redis/RedisPrefix';

export async function changeUserPassword(
	newPassword: string,
	key: string,
	redis: Redis
) {
	const userId = await redis.get(`${RedisPrefix.forgotPassword}${key}`);

	if (userId) {
		await redis.del(key);

		await UserModule.unlockUser(userId);

		const userDoc = await UserModel.findById(userId);
		if (userDoc) {
			userDoc.password = newPassword;
			userDoc.save();
			return true;
		}
	}
	return false;
}
