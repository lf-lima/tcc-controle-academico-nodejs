import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IProfilePermission extends IBaseEntity {
  profileId: number
  permissionId: number
}
