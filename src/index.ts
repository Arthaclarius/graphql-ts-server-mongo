import 'reflect-metadata'

import * as dotenv from 'dotenv'

import { startServer } from './server/startServer'

dotenv.config()

process.env.NODE_PORT = process.env.NODE_ENV !== 'test' ? process.env.SERVER_PORT || '4000' : process.env.TEST_PORT
process.env.NODE_URL = process.env.NODE_ENV !== 'test' ? process.env.SERVER_URL || '4000' : process.env.TEST_URL

const PORT = Number(process.env.NODE_PORT)
startServer(PORT)
