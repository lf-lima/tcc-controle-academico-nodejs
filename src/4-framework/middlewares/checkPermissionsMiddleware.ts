import { Response, NextFunction } from 'express'

export async function checkPermissionsMiddleware (necessaryPermissions: string[]) {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const payloadPermissions = req.payload.permissions

      for (const necessaryPermission of necessaryPermissions) {
        const match = payloadPermissions.find((permissionObj: { name: string }) => {
          const payloadPermission = permissionObj.name

          if (necessaryPermission.search('::') !== -1) {
            const necessaryTypeFilter =
              necessaryPermission.substring(necessaryPermission.search('::') + 2, necessaryPermission.length)
            const necessaryPermissionName =
              necessaryPermission.substring(0, necessaryPermission.search('::'))

            const payloadTypeFilter =
              payloadPermission.substring(payloadPermission.search('::') + 2, payloadPermission.length)
            const payloadPermissionName =
              payloadPermission.substring(0, payloadPermission.search('::'))

            if (
              necessaryPermissionName === payloadPermissionName &&
              necessaryTypeFilter === payloadTypeFilter
            ) {
              return permissionObj
            }

            if (
              necessaryPermissionName === payloadPermissionName &&
              necessaryTypeFilter === 'mine' &&
              payloadTypeFilter === 'all'
            ) {
              return permissionObj
            }
          } else {
            return payloadPermission === necessaryPermission
          }
        })

        if (!match) {
          return res.status(401).json({ error: 'Not authorized' })
        }
      }

      return next()
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}
