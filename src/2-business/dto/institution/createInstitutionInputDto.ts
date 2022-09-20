import { PartialBy } from '#business/utils/partialBy'
import { IInstitution } from '#domain/entities/iInstitution'

export interface CreateInstitutionInputDto extends PartialBy<IInstitution, 'id' | 'userId'> {
  password: string
  documentNumber: string
}
