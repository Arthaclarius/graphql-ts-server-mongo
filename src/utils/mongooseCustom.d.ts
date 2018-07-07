type SelectMongo<M> = { [U in keyof M]: -1 | 1 }
type SortMongo<M> = { [U in keyof M]: -1 | 1 }
