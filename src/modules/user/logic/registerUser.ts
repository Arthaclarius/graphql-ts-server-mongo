import { User, UserModel } from '../user.model'

export async function registerUser(email: string, password: string) {
	const user = new User()
	user.email = email
	user.password = password

	const userDoc = new UserModel(user)
	await userDoc.save()

	// await createConfirmEmailLink(email, userDoc.id, redis)

	return userDoc
}
