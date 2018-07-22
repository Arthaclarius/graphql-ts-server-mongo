import * as dotenv from 'dotenv';
import * as faker from 'faker';

import { LoginErrors } from '../errors/LoginErrors';
import { RegisteUserIfNotExist } from '../test/RegisteUserIfNotExist';
import { TestClient } from '../test/TestClient';
import { TestGQLErrors } from '../test/TestGQLErrors';

const email = faker.internet.exampleEmail();
const unconfirmedEmail = faker.internet.exampleEmail();
const password = faker.internet.password(6);

dotenv.config();

beforeAll(() => RegisteUserIfNotExist(email, password, unconfirmedEmail));

test('Login', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resLogin = await tc.login(email, password);

	expect(resLogin.data.login).toEqual(true);
});

test('Wrong Email Login', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resLogin = await tc.login('wrong@bob.com', password);

	TestGQLErrors(resLogin, LoginErrors.InvalidLoginError());
});

test('Wrong Password Login', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resLogin = await tc.login(email, 'wrongPassword123');

	TestGQLErrors(resLogin, LoginErrors.InvalidLoginError());
});

test('Unconfirmed User', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resLogin = await tc.login(unconfirmedEmail, password);

	TestGQLErrors(resLogin, LoginErrors.UserNotConfirmedError());
});

test('Logout', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);

	await tc.login(email, password);

	let resMe = await tc.me();
	expect(resMe.data.me.email).toEqual(email);

	await tc.logout();

	resMe = await tc.me();
	expect(resMe.data.me).toBeNull();
});

test('Logout Multi', async () => {
	const session1 = new TestClient(process.env.TEST_URL as string);
	const session2 = new TestClient(process.env.TEST_URL as string);

	await session1.login(email, password);
	await session2.login(email, password);

	expect(await session1.me()).toEqual(await session2.me());

	await session1.logout();
	expect(await session1.me()).toEqual(await session2.me());
});
