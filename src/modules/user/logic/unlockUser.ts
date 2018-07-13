import { User, UserModel } from '../user.model'

export async function unlockUser(userId: string) {
	await UserModel.findByIdAndUpdate(userId, { locked: false } as User)
}
