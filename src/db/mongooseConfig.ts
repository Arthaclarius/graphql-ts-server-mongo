import { ConnectionOptions } from 'mongoose';

export const dbConnectionString = `mongodb://${process.env.DB_HOST}:${process
	.env.DB_PORT || '27017'}`;

export const dbConfig: ConnectionOptions = {
	user: process.env.DB_USERNAME,
	pass: process.env.DB_PASSWORD,

	dbName:
		process.env.DB_DATABASE +
		'-' +
		(process.env.NODE_ENV === 'production'
			? ''
			: process.env.NODE_ENV || 'development'),

	ssl: (process.env.DB_SSL ? true : false) || false,
	replicaSet: process.env.DB_REPLICA_SET,
	authSource: process.env.DB_AUTH_SOURCE
};
