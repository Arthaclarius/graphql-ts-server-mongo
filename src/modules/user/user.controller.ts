// import { Get, JsonController, Param } from 'routing-controllers'
// import { User, UserModel } from './user.model'

// import { RedisPrefix } from '../redis/redisPrefix'
// import { redisInstance } from '../redis/RedisInstance'

// export type ConfirmLink = {
// 	link: string | null
// }

// export type ConfirmUser = {
// 	confirm: boolean
// }

// @JsonController('/user')
// export class UserController {
// 	@Get('/confirm/:id')
// 	async confirm(@Param('id') id: string): Promise<ConfirmUser> {
// 		const user = await redisInstance.get(`${RedisPrefix.register}${id}`)

// 		if (user) {
// 			await redisInstance.del(`${RedisPrefix.register}${id}`)
// 			await UserModel.findByIdAndUpdate(user, { confirmed: true } as User)

// 			return { confirm: true }
// 		} else {
// 			return { confirm: false }
// 		}
// 	}
// }
