import * as dotenv from 'dotenv'
import * as faker from 'faker'

import { LoginErrors } from '../errors/LoginErrors'
import { RegisteUserIfNotExist } from '../test/RegisteUserIfNotExist'
import { TestClient } from '../test/TestClient'
import { TestGQLErrors } from '../test/TestGQLErrors'

dotenv.config()

const email = faker.internet.exampleEmail()
const password = faker.internet.password(6)
const newPassword = faker.internet.password(6)

beforeAll(async () => await RegisteUserIfNotExist(email, password))

test('ForgotPassword', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resSendForgotPassword = await tc.sendForgotPassword(email)
	const urlLink = resSendForgotPassword.data.sendForgotPassword as string

	expect(urlLink).not.toBeNull()

	const resLoginLocked = await tc.login(email, password)
	TestGQLErrors(resLoginLocked, LoginErrors.UserLockedError())

	const urlSplit = urlLink.split('/')
	const key = urlSplit[urlSplit.length - 1]

	const res = await tc.forgotPassword(key, newPassword)

	expect(res.data.forgotPassword).toEqual(true)

	const resLogin = await tc.login(email, newPassword)
	expect(resLogin.data.login).toEqual(true)
	const resMe = await tc.me()

	expect(resMe.data.me.email).toEqual(email)
})
