import { PartialBy } from '#business/utils/partialBy'
import { IProfessor } from '#domain/entities/iProfessor'

export interface CreateProfessorInputDto extends PartialBy<IProfessor, 'id' | 'userId'> {
  password: string
  documentNumber: string
}
