import { CreateInstitutionInputDto } from '#business/dto/institution/createInstitutionInputDto'
import { IInstitution } from '#domain/entities/iInstitution'

export interface IInstitutionRepository {
  create(data: CreateInstitutionInputDto): Promise<IInstitution>
}
