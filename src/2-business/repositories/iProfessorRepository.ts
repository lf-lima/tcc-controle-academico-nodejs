import { PartialBy } from '#business/utils/partialBy'
import { IProfessor } from '#domain/entities/iProfessor'

export interface IProfessorRepository {
  create (data: PartialBy<IProfessor, 'id'>): Promise<IProfessor>
  findAll (): Promise<IProfessor[]>
  findAllByInstitutionId (institutionId: number): Promise<IProfessor[]>
  findByUserId (userId: number): Promise<IProfessor | undefined>
}
