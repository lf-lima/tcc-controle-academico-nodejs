import { PartialBy } from '#business/utils/partialBy'
import { IStudent } from '#domain/entities/iStudent'

export interface CreateStudentInputDto extends PartialBy<IStudent, 'id' | 'userId'> {
  password: string
  documentNumber: string
}
