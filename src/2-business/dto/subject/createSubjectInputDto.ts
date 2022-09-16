import { PartialBy } from '#business/utils/partialBy'
import { ISubject } from '#domain/entities/iSubject'

export type CreateSubjectInputDto = PartialBy<ISubject, 'id'>
