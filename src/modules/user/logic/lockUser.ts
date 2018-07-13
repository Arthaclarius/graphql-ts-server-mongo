import { User, UserModel } from '../user.model'

export async function lockUser(userId: string) {
	await UserModel.findByIdAndUpdate(userId, { locked: true } as User)
}
