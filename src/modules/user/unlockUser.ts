import { User, UserModel } from '@models/User'

export async function unlockUser(userId: string) {
	await UserModel.findByIdAndUpdate(userId, { locked: false } as User)
}
