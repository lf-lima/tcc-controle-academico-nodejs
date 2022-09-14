import { Router } from 'express'
import { routers } from '#framework/const/routers'
import { IMainRouter } from '#framework/routers/base/iMainRouter'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#framework/adapters/operation/expressOperationAdapter'

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
      for (const { method, routePath, operation, input, inputNormalizer } of currentRouter.routes) {
        const operationAdapter = new ExpressOperationAdapter(operation)

        currentRouter.router[method](routePath, operationAdapter.adapt({ Input: input, inputNormalizer }))

        console.log(`${method.toUpperCase()} ${currentRouter.baseRoute}${routePath}`)
      }
      console.log('----------')

      this.router.use(currentRouter.baseRoute, currentRouter.router)
    }
    console.log('\n')
  }
}
