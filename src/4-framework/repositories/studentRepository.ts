import { PartialBy } from '#business/utils/partialBy'
import { IStudentRepository } from '#business/repositories/iStudentRepository'
import Student from '#framework/models/mysql/student.model'
import { IStudent } from '#domain/entities/iStudent'
import User from '#framework/models/mysql/user.model'

export class StudentRepository implements IStudentRepository {
  private readonly repo: typeof Student = Student

  async create (data: PartialBy<IStudent, 'id'>): Promise<IStudent> {
    return await this.repo.create(data as Student)
  }

  async findByUserId (userId: number): Promise<IStudent | undefined> {
    return await this.repo.findOne({ where: { userId }}) as IStudent | undefined
  }

  async findById (studentId: number): Promise<IStudent | undefined> {
    return await this.repo.findByPk(studentId) as IStudent | undefined
  }

  async findAllByInstitutionId (institutionId: number): Promise<IStudent[]> {
    return await this.repo.findAll({
      include: [User],
      where: { institutionId }
    })
  }
}
