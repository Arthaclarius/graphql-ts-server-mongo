import { TestClient } from './TestClient';

export async function RegisteUserIfNotExist(
	email: string,
	password: string,
	unconfirmedEmail?: string
) {
	try {
		const tc = new TestClient(process.env.TEST_URL as string);
		const resRegister = await tc.register(email, password);
		if (unconfirmedEmail) {
			await tc.register(unconfirmedEmail, password);
		}

		if (!resRegister.data) {
			return;
		}

		const id = resRegister.data.register as string | null;

		if (id) {
			// Confirm User
			await tc.confirmUser(id);
		}
	} catch (error) {
		console.log(error);
	}
}
