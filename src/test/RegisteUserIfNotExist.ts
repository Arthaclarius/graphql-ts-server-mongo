import { ConfirmLink } from '../modules/user/user.controller'
import { TestClient } from './TestClient'
import { User } from '../modules/user/user.model'
import { UserTest } from '../modules/user/test/utils/UserTest'
import nodeFetch from 'node-fetch'

export async function RegisteUserIfNotExist() {
	try {
		const email = UserTest.user.email
		const password = UserTest.user.password
		const unconfirmedEmail = UserTest.unconfirmedUser.email

		const tc = new TestClient(process.env.TEST_URL as string)
		const resRegister = await tc.register(email, password)
		await tc.register(unconfirmedEmail, password)

		if (!resRegister.data) return

		const user = resRegister.data.register as User | null

		if (user) {
			// Confirm User
			const responseAddConfirm = await nodeFetch(process.env.TEST_URL + '/api/user/addConfirm/' + user.id)
			const dataConfirm = (await responseAddConfirm.json()) as ConfirmLink

			if (dataConfirm.link) {
				await nodeFetch(dataConfirm.link)
			}
		}
	} catch (error) {
		console.log(error)
	}
}
