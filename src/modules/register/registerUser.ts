import { User, UserModel } from '@models/User'

import { EmailTemplate } from '@modules/email/EmailTemplate'

export async function registerUser(email: string, password: string) {
	const user = new User()
	user.email = email
	user.password = password

	const userDoc = new UserModel(user)
	await userDoc.save()

	const link = await EmailTemplate.confirmRegisterEmail(email, userDoc.id)

	return link
}
