import * as dotenv from 'dotenv'

import { RegisteUserIfNotExist } from '../../../test/RegisteUserIfNotExist'
import { TestClient } from '../../../test/TestClient'
import { UserTest } from './utils/UserTest'

dotenv.config()

beforeAll(RegisteUserIfNotExist)

const email = UserTest.user.email
const newPassword = UserTest.user.password

test('ForgotPassword', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resSendForgotPassword = await tc.sendForgotPassword(email)
	const urlLink = resSendForgotPassword.data.sendForgotPassword as string

	expect(urlLink).not.toBeNull()

	const urlSplit = urlLink.split('/')
	const key = urlSplit[urlSplit.length - 1]

	const res = await tc.forgotPassword(key, newPassword)

	expect(res.data.forgotPassword).toEqual(true)
})
