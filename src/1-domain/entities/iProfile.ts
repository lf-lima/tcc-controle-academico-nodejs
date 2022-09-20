import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { ProfileName } from '#domain/enums/profileName'

export default interface IProfile extends IBaseEntity {
  name: ProfileName
}
