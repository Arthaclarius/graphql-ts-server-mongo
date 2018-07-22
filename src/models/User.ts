import * as bcrypt from 'bcryptjs';
import {
  Column,
  Entity,
  FuncMongooseMiddleware,
  getModel,
  getSchema,
  PreHook,
} from 'mongoose-simple-decorator';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
	@PreHook('save')
	public static preSaveHashPassword: FuncMongooseMiddleware.DocumentRef<
		User
	> = async (THIS, next) => {
		if (THIS.password) {
			THIS.password = await bcrypt.hash(THIS.password, 10);
		}
		next();
	};

	@Field(() => ID)
	public id: string;

	@Field()
	@Column(String, true)
	public email: string;

	@Column(String, true)
	public password: string;

	@Field(() => Boolean)
	@Column({ type: Boolean, default: false }, true)
	public confirmed: boolean;

	@Field(() => Boolean)
	@Column({ type: Boolean, default: false }, true)
	public locked: boolean;
}

export const UserModel = getModel(new User());
export const UserSchema = getSchema(User);
