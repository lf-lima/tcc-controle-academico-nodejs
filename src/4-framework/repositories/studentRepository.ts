import { PartialBy } from '#business/utils/partialBy'
import { IStudentRepository } from '#business/repositories/iStudentRepository'
import Student from '#framework/models/mysql/student.model'
import { IStudent } from '#domain/entities/iStudent'

export class StudentRepository implements IStudentRepository {
  private readonly repo: typeof Student = Student

  async create (data: PartialBy<IStudent, 'id'>): Promise<IStudent> {
    return await this.repo.create(data as Student)
  }

  async findByUserId (userId: number): Promise<IStudent | undefined> {
    return await this.repo.findOne({ where: { userId }}) as IStudent | undefined
  }
}
