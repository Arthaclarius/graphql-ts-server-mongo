import * as dotenv from 'dotenv'

import { ConfirmLink, ConfirmUser } from '../user.controller'

import { TestClient } from '../../../test/TestClient'
import fetch from 'node-fetch'

dotenv.config()

const email = 'confirm@bob.com'
const password = 'QWEasd123'

test('Confirm Email Link', async function() {
	const tc = new TestClient(process.env.TEST_URL as string)

	const resRegister = await tc.register(email, password)

	expect(resRegister.data.register.email).toEqual(email)

	const response2 = await fetch(process.env.TEST_URL + '/api/user/addConfirm/' + resRegister.data.register.id)
	const link = (await response2.json()) as ConfirmLink

	expect(link.link).not.toBeNull()

	if (link.link) {
		const response3 = await fetch(link.link)
		const confirm = (await response3.json()) as ConfirmUser
		expect(confirm.confirm).toEqual(true)
	}
})

test('Invalid User ID', async function() {
	const response = await fetch(process.env.TEST_URL + '/api/user/addConfirm/' + 'NotAnID')
	const link = (await response.json()) as ConfirmLink

	expect(link.link).toBeNull()
})

test('Invalid Confirm Link', async function() {
	const response = await fetch(process.env.TEST_URL + '/api/user/confirm/' + 'NotAnID')
	const confirm = (await response.json()) as ConfirmUser
	expect(confirm.confirm).toEqual(false)
})
