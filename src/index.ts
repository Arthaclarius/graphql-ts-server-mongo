import 'reflect-metadata';

import '@dotenv';
import { startServer } from '@server/startServer';

const isTest = process.env.NODE_ENV !== 'test';

process.env.NODE_PORT = isTest
	? process.env.SERVER_PORT || '4000'
	: process.env.TEST_PORT;
process.env.NODE_URL = isTest
	? process.env.SERVER_URL || '4000'
	: process.env.TEST_URL;

const PORT = Number(process.env.NODE_PORT);
startServer(PORT);
