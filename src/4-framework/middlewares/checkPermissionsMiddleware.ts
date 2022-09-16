import { Response, NextFunction } from 'express'

export function checkPermissionsMiddleware (necessaryPermissions: string[]) {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const payloadPermissions = req.tokenPayload.permissions

      for (const necessaryPermission of necessaryPermissions) {
        const match = payloadPermissions.find(permissionName => {
          if (necessaryPermission.search('::') !== -1) {
            const necessaryTypeFilter =
              necessaryPermission.substring(necessaryPermission.search('::') + 2, necessaryPermission.length)
            const necessaryPermissionName =
              necessaryPermission.substring(0, necessaryPermission.search('::'))

            const payloadTypeFilter =
              permissionName.substring(permissionName.search('::') + 2, permissionName.length)
            const payloadPermissionName =
              permissionName.substring(0, permissionName.search('::'))

            if (
              necessaryPermissionName === payloadPermissionName &&
              necessaryTypeFilter === payloadTypeFilter
            ) {
              return permissionName
            }

            if (
              necessaryPermissionName === payloadPermissionName &&
              necessaryTypeFilter === 'mine' &&
              payloadTypeFilter === 'all'
            ) {
              return permissionName
            }
          } else {
            return permissionName === necessaryPermission
          }
        })

        if (!match) {
          return res.status(401).json({ error: 'Not authorized' })
        }
      }

      return next()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}
