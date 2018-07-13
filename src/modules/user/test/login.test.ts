import * as dotenv from 'dotenv'

import { RegisteUserIfNotExist } from '../../../test/RegisteUserIfNotExist'
import { TestClient } from '../../../test/TestClient'
import { TestGQLErrors } from '../../../test/TestGQLErrors'
import { UserErrors } from '../user.errors'
import { UserTest } from './utils/UserTest'

dotenv.config()

const email = UserTest.user.email
const password = UserTest.user.password
const unconfirmedEmail = UserTest.unconfirmedUser.email

beforeAll(() => RegisteUserIfNotExist())

test('Login', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resLogin = await tc.login(email, password)

	expect(resLogin.data.login).toEqual(true)
})

test('Wrong Email Login', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resLogin = await tc.login('wrong@bob.com', password)

	TestGQLErrors(resLogin, UserErrors.InvalidLoginError())
})

test('Wrong Password Login', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resLogin = await tc.login(email, 'wrongPassword123')

	TestGQLErrors(resLogin, UserErrors.InvalidLoginError())
})

test('Unconfirmed User', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resLogin = await tc.login(unconfirmedEmail, password)

	TestGQLErrors(resLogin, UserErrors.UserNotConfirmedError())
})
