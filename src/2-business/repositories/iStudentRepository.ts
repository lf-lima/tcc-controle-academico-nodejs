import { CreateStudentInputDto } from '#business/dto/student/createStudentInputDto'
import { IStudent } from '#domain/entities/iStudent'

export interface IStudentRepository {
  create(data: CreateStudentInputDto): Promise<IStudent>
}
