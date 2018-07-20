import { User, UserModel } from '@models/User'

export async function lockUser(userId: string) {
	await UserModel.findByIdAndUpdate(userId, { locked: true } as User)
}
