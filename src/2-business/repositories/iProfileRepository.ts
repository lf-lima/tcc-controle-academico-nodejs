import IProfile from '#domain/entities/iProfile'
import { ProfileName } from '#domain/enums/profileName'

export interface IProfileRepository {
  findByName(profileName: ProfileName): Promise<IProfile | undefined>
}
