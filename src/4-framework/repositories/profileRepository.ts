
import Profile from '#framework/models/mysql/profile.model'
import { IProfileRepository } from '#business/repositories/iProfileRepository'
import IProfile from '#domain/entities/iProfile'
import { ProfileName } from '#domain/enums/profileName'

export class ProfileRepository implements IProfileRepository {
  private readonly repo: typeof Profile = Profile

  async findByName (profileName: ProfileName): Promise<IProfile | undefined> {
    return await this.repo.findOne({ where: { name: profileName }}) as IProfile
  }
}
