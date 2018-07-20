import * as dotenv from 'dotenv'
import * as faker from 'faker'

import { RegisteUserIfNotExist } from '../test/RegisteUserIfNotExist'
import { TestClient } from '../test/TestClient'

dotenv.config()

const email = faker.internet.exampleEmail()
const password = faker.internet.password(6)

beforeAll(() => RegisteUserIfNotExist(email, password))

test('Me', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)

	const resLogin = await tc.login(email, password)
	expect(resLogin.data.login).toEqual(true)

	const resMe = await tc.me()

	expect(resMe.data.me.email).toEqual(email)
})
