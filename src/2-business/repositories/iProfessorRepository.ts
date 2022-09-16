import { PartialBy } from '#business/utils/partialBy'
import { IProfessor } from '#domain/entities/iProfessor'

export interface IProfessorRepository {
  create(data: PartialBy<IProfessor, 'id'>): Promise<IProfessor>
}
