import { CorsOptions } from 'cors'

export const cors = (port: number) => {
	return {
		credentials: true,
		origin: process.env.NODE_ENV === 'test' ? '*' : `http://localhost:${port}`
	} as CorsOptions
}
