import * as bcrypt from 'bcryptjs'

import { Column, Entity, FuncMongooseMiddleware, PreHook, getModel, getSchema } from 'mongoose-simple-decorator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class User {
	@Field(() => ID)
	public id: string

	@Field()
	@Column(String, true)
	public email: string

	@Column(String, true)
	public password: string

	@Field(() => Boolean)
	@Column({ type: Boolean, default: false }, true)
	public confirmed: boolean

	@Field(() => Boolean)
	@Column({ type: Boolean, default: false }, true)
	public locked: boolean

	@PreHook('save')
	static preSaveHashPassword: FuncMongooseMiddleware.DocumentRef<User> = async (_this, next) => {
		if (_this.password) {
			_this.password = await bcrypt.hash(_this.password, 10)
		}
		next()
	}
}

export const UserModel = getModel(new User())
export const UserSchema = getSchema(User)
