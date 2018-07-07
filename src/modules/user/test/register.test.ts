import * as dotenv from 'dotenv'

import { TestGQLErrors, TestGQLPartialErrors } from '../../../test/TestGQLErrors'

import { TestClient } from '../../../test/TestClient'
import { UserErrors } from '../user.errors'

dotenv.config()

const email = 'bob@bob.com'
const password = 'QWEasd123'

test('Register User', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)

	const resRegister = await tc.register(email, password)

	expect(resRegister.data.register.email).toEqual(email)
})

test('Duplicated Register', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resRegister = await tc.register(email, password)

	TestGQLErrors(resRegister, UserErrors.EmailAlreadyTakenError(email))
})

test('Invalid Email', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resRegister = await tc.register('not a email', password)

	TestGQLPartialErrors(resRegister, [ 'email' ])
})

test('Invalid Password', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)
	const resRegister = await tc.register(email, 'short')

	TestGQLPartialErrors(resRegister, [ 'password' ])
})
