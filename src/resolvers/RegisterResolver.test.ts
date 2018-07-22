import * as dotenv from 'dotenv';
import * as faker from 'faker';

import { RegisterErrors } from '../errors/RegisterErrors';
import { TestClient } from '../test/TestClient';
import { TestGQLErrors, TestGQLPartialErrors } from '../test/TestGQLErrors';

dotenv.config();

const email = faker.internet.exampleEmail();
const password = faker.internet.password(6);
const emailConfirm = faker.internet.exampleEmail();
const passwordConfirm = faker.internet.password(6);

test('Register User', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);

	const resRegister = await tc.register(email, password);
	expect(resRegister.data.register).toBeTruthy();
});

test('Duplicated Register', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resRegister = await tc.register(email, password);

	TestGQLErrors(resRegister, RegisterErrors.EmailAlreadyTakenError(email));
});

test('Invalid Email', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resRegister = await tc.register('not a email', password);

	TestGQLPartialErrors(resRegister, [ 'email' ]);
});

test('Invalid Password', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resRegister = await tc.register(email, 'short');

	TestGQLPartialErrors(resRegister, [ 'password' ]);
});

test('Confirm Email Link', async () => {
	const tc = new TestClient(process.env.TEST_URL as string);
	const resRegister = await tc.register(emailConfirm, passwordConfirm);

	const id = resRegister.data.register as string;
	expect(id).toBeTruthy();

	const resConfirmUser = await tc.confirmUser(id);
	const isConfirmed = resConfirmUser.data.confirmUser;
	expect(isConfirmed).toEqual(true);
});
