import * as dotenv from 'dotenv'

import { RegisteUserIfNotExist } from '../../../test/RegisteUserIfNotExist'
import { TestClient } from '../../../test/TestClient'
import { UserTest } from './utils/UserTest'

dotenv.config()

beforeAll(() => RegisteUserIfNotExist())

const email = UserTest.user.email
const password = UserTest.user.password

test('Logout', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)

	await tc.login(email, password)

	let resMe = await tc.me()
	expect(resMe.data.me.email).toEqual(email)

	await tc.logout()

	resMe = await tc.me()
	expect(resMe.data.me).toBeNull()
})

test('Logout Multi', async function() {
	const session1 = new TestClient(process.env.TEST_URL as string)
	const session2 = new TestClient(process.env.TEST_URL as string)

	await session1.login(email, password)
	await session2.login(email, password)

	expect(await session1.me()).toEqual(await session2.me())

	await session1.logout()
	expect(await session1.me()).toEqual(await session2.me())
})
