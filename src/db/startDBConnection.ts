import * as mongoose from 'mongoose'

import { dbConfig, dbConnectionString } from '@db/mongooseConfig'

import { DropDB } from '@db/dropDB'

export async function startDBConnection() {
	try {
		const connection = await mongoose.connect(dbConnectionString, dbConfig)

		const isTest = process.env.NODE_ENV === 'test'
		if (isTest && mongoose.connection) {
			await DropDB(mongoose.connection)
		}

		console.log('Mongo Connection Ready')
		return connection
	} catch (error) {
		throw error
	}
}
