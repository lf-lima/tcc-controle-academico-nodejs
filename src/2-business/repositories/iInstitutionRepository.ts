import { PartialBy } from '#business/utils/partialBy'
import { IInstitution } from '#domain/entities/iInstitution'

export interface IInstitutionRepository {
  create(data: PartialBy<IInstitution, 'id'>): Promise<IInstitution>
  findByUserId(userId: number): Promise<IInstitution | undefined>
}
