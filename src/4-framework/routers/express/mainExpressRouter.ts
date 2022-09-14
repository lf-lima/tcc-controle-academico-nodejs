import { Router } from 'express'
import { routers } from '#framework/const/routers'
import { IMainRouter } from '#framework/routers/base/iMainRouter'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#framework/adapters/operation/expressOperationAdapter'
import { authenticationMiddleware } from '#framework/middlewares/authenticationMiddleware'
import { checkPermissionsMiddleware } from '#framework/middlewares/checkPermissionsMiddleware'

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
        const { routeName, method, routePath, operation, input, inputNormalizer, permissions } = route

        const operationAdapter = new ExpressOperationAdapter(operation)

        if (permissions && permissions.length) {
          currentRouter.router[method](
            routePath,
            authenticationMiddleware,
            checkPermissionsMiddleware,
            operationAdapter.adapt({ Input: input, inputNormalizer }))
        } else {
          currentRouter.router[method](routePath, operationAdapter.adapt({ Input: input, inputNormalizer }))
        }

        console.log(`${routeName} -> ${method.toUpperCase()} | ${currentRouter.baseRoute}${routePath}`)
      }
      console.log('----------')

      this.router.use(currentRouter.baseRoute, currentRouter.router)
    }
    console.log('\n')
  }
}
