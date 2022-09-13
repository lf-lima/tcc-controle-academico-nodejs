import { IBaseEntity } from '#domain/entities/iBaseEntity'

export default interface IPermission extends IBaseEntity {
  name: string
  description: string
}
