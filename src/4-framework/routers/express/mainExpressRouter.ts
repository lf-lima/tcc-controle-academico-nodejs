import { NextFunction, Response, Router } from 'express'
import { routers } from '#framework/const/routers'
import { IMainRouter } from '#framework/routers/base/iMainRouter'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#framework/adapters/operation/expressOperationAdapter'
import { authenticationMiddleware } from '#framework/middlewares/authenticationMiddleware'
import { checkPermissionsMiddleware } from '#framework/middlewares/checkPermissionsMiddleware'
import { uploadFileMiddleware } from '#framework/middlewares/uploadFileMiddleware'

export type IMainExpressRouter = IMainRouter<Router>

export class MainExpressRouter implements IMainExpressRouter {
  public router!: Router
  public routers!: ExpressRouter[]

  constructor () {
    this.router = Router()
    this.routers = routers
  }

  routing (): void {
    console.log('\n= Routing =')
    console.log('----------')
    for (const currentRouter of this.routers) {
      for (const route of currentRouter.routes) {
        const { routeName, method, routePath, operation, input, inputNormalizer, permissions, options } = route

        const operationAdapter = new ExpressOperationAdapter(operation)
        const funcs: ((req: any, res: Response, next: NextFunction) => any)[] = []

        if (permissions && permissions.length) {
          funcs.push(
            authenticationMiddleware,
            checkPermissionsMiddleware(permissions)
          )
        }

        if (options) {
          if (options.uploadFileMiddleware) {
            funcs.push(uploadFileMiddleware())
          }
        }

        funcs.push(operationAdapter.adapt({ Input: input, inputNormalizer }))

        currentRouter.router[method](routePath, ...funcs)

        console.log(`${routeName} -> ${method.toUpperCase()} | ${currentRouter.baseRoute}${routePath}`)
      }
      console.log('----------')

      this.router.use(currentRouter.baseRoute, currentRouter.router)
    }
    console.log('\n')
  }
}
