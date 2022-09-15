import { PartialBy } from '#business/utils/partialBy'
import { IUser } from '#domain/entities/iUser'

export type CreateUserInputDto = PartialBy<IUser, 'id'>
