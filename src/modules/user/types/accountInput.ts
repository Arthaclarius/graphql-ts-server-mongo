import { Field, InputType } from 'type-graphql'

import { Account } from './account'

@InputType()
export class AccountInput extends Account {
	@Field(() => String)
	email: string
	@Field(() => String)
	password: string
}
