import * as rp from 'request-promise';

export class TestClient {
	private url: string;
	private options: rp.RequestPromiseOptions;
	constructor(url: string) {
		this.url = url;
		this.options = {
			withCredentials: true,
			json: true,
			jar: rp.jar()
		};
	}

	public register(email: string, password: string) {
		const query = `
      mutation {
        register (register: { email: "${email}", password: "${password}" })
      }
    `;

		return this.sendPostGQLServer(query);
	}

	public confirmUser(id: string) {
		const query = `
			mutation {
				confirmUser(id: "${id}")
			}
		`;

		return this.sendPostGQLServer(query);
	}

	public login(email: string, password: string) {
		const query = `
      mutation {
        login(login: { email: "${email}", password: "${password}" })
      }
    `;
		return this.sendPostGQLServer(query);
	}

	public logout() {
		const query = `
			mutation{
				logout
			}
		`;
		return this.sendPostGQLServer(query);
	}

	public me() {
		const query = `
      {
        me {
          id
          email
        }
      }
    `;
		return this.sendPostGQLServer(query);
	}

	public sendForgotPassword(email: string) {
		const query = `
		mutation {
			sendForgotPassword(email: "${email}")
		}
		`;
		return this.sendPostGQLServer(query);
	}

	public forgotPassword(key: string, password: string) {
		const query = `
		mutation {
			forgotPassword(key: "${key}", password: {password: "${password}"})
		}
		`;
		return this.sendPostGQLServer(query);
	}

	private sendPostGQLServer = (query: string) => {
		return rp.post(this.url, {
			...this.options,
			body: {
				query
			}
		});
	};
}
