import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'
import Institution from '#framework/models/mysql/institution.model'
import { IInstitution } from '#domain/entities/iInstitution'
import { PartialBy } from '#business/utils/partialBy'

export class InstitutionRepository implements IInstitutionRepository {
  private readonly repo = Institution

  async create (data: PartialBy<IInstitution, 'id'>): Promise<IInstitution> {
    return await this.repo.create(data as Institution)
  }

  async findByUserId (userId: number): Promise<IInstitution | undefined> {
    return await this.repo.findOne({ where: { userId }}) as IInstitution | undefined
  }
}
