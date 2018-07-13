import * as dotenv from 'dotenv'

import { RegisteUserIfNotExist } from '../../../test/RegisteUserIfNotExist'
import { TestClient } from '../../../test/TestClient'
import { TestGQLErrors } from '../../../test/TestGQLErrors'
import { UserErrors } from '../user.errors'
import { UserTest } from './utils/UserTest'

dotenv.config()

beforeAll(async () => await RegisteUserIfNotExist(UserTest.user2.email, UserTest.user2.password))

const email = UserTest.user2.email
const password = UserTest.user2.password
const newPassword = UserTest.user2.password + 'NewTextToThePassword'

test('ForgotPassword', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resSendForgotPassword = await tc.sendForgotPassword(email)
	const urlLink = resSendForgotPassword.data.sendForgotPassword as string

	expect(urlLink).not.toBeNull()

	const resLoginLocked = await tc.login(email, password)
	TestGQLErrors(resLoginLocked, UserErrors.UserLockedError())

	const urlSplit = urlLink.split('/')
	const key = urlSplit[urlSplit.length - 1]

	const res = await tc.forgotPassword(key, newPassword)

	expect(res.data.forgotPassword).toEqual(true)

	const resLogin = await tc.login(email, newPassword)
	expect(resLogin.data.login).toEqual(true)
	const resMe = await tc.me()

	expect(resMe.data.me.email).toEqual(email)
})
