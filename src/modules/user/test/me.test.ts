import * as dotenv from 'dotenv'

import { RegisteUserIfNotExist } from '../../../test/RegisteUserIfNotExist'
import { TestClient } from '../../../test/TestClient'
import { UserTest } from './utils/UserTest'

dotenv.config()

beforeAll(RegisteUserIfNotExist)

const email = UserTest.user.email
const password = UserTest.user.password

test('Me', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)

	const resLogin = await tc.login(email, password)

	expect(resLogin.data.login).toEqual(true)

	const resMe = await tc.me()

	expect(resMe.data.me.email).toEqual(email)
})
