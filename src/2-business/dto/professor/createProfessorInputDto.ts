import { PartialBy } from '#business/utils/partialBy'
import { IProfessor } from '#domain/entities/iProfessor'

export interface CreateProfessorInputDto extends PartialBy<IProfessor, 'id'> {
  password: string
  documentNumber: string
  profileId: number
}
