import { Get, JsonController, Param } from 'routing-controllers'
import { User, UserModel } from './user.model'

import { createConfirmEmailLink } from '../../utils/createLink/confirmEmail'
import { redis } from '../../config/redis.config'

export type ConfirmLink = {
	link: string | null
}

export type ConfirmUser = {
	confirm: boolean
}

@JsonController('/user')
export class UserController {
	@Get('/addConfirm/:id')
	async addConfirm(@Param('id') id: string): Promise<ConfirmLink> {
		try {
			const user = await UserModel.findById(id).select('id email')

			if (user) {
				const confirmLink = await createConfirmEmailLink(user.email, user.id, redis)
				return { link: confirmLink }
			} else {
				return { link: null }
			}
		} catch (error) {
			return { link: null }
		}
	}

	@Get('/confirm/:id')
	async confirm(@Param('id') id: string): Promise<ConfirmUser> {
		const user = await redis.get(id)

		if (user) {
			await redis.del(id)
			await UserModel.findByIdAndUpdate(user, { confirmed: true } as User)

			return { confirm: true }
		} else {
			return { confirm: false }
		}
	}
}
