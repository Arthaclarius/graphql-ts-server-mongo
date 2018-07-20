import { Connection } from 'mongoose'

export async function DropDB(conn: Connection) {
	if (process.env.NODE_ENV === 'production') {
		return
	}

	console.warn('--- DROP TEST DATABASE ---')
	await conn.db.dropDatabase()
}
