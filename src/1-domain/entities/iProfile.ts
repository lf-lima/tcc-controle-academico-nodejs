import { IBaseEntity } from '#domain/entities/iBaseEntity'

export default interface IProfile extends IBaseEntity {
  name: string
}
