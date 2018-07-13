import { dbConfig, dbConnectionString } from './mongooseConfig'

import { DropDB } from './dropDB'
import { connect } from 'mongoose'

export async function startDBConnection() {
	try {
		const connection = await connect(dbConnectionString, dbConfig)

		const isTest = process.env.NODE_ENV === 'test'
		if (isTest) {
			DropDB(connection as any)
		}

		return connection
	} catch (error) {
		throw error
	}
}
