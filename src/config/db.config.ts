import * as dotenv from 'dotenv'

import { Connection, ConnectionOptions, connect } from 'mongoose'

dotenv.config()

const dbConnectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || '27017'}`
const dbConfig: ConnectionOptions = {
	user: process.env.DB_USERNAME,
	pass: process.env.DB_PASSWORD,

	dbName:
		process.env.DB_DATABASE +
		'-' +
		(process.env.NODE_ENV == 'production' ? '' : process.env.NODE_ENV || 'development'),

	ssl: (process.env.DB_SSL ? true : false) || false,
	replicaSet: process.env.DB_REPLICA_SET,
	authSource: process.env.DB_AUTH_SOURCE
}

export async function StartDBConnection() {
	try {
		const conn = await connect(dbConnectionString, dbConfig)
		DropDBTest(conn.connection)
		return conn
	} catch (error) {
		throw error
	}
}

async function DropDBTest(conn: Connection) {
	if (process.env.NODE_ENV === 'test') {
		console.warn('--- DROP TEST DATABASE ---')
		conn.db.dropDatabase()
	}
}
