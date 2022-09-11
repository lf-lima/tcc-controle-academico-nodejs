import { Router } from 'express'
import { routers } from '#framework/const/routers'
import { IBaseRouter } from '#framework/routers/base/iBaseRouter'
import { IMainRouter } from '#framework/routers/base/iMainRouter'

export type IMainExpressRouter = IMainRouter<Router>

export class MainExpressRouter implements IMainExpressRouter {
  public router!: Router
  public routers!: IBaseRouter<Router>[]

  constructor () {
    this.router = Router()
    this.routers = routers
  }

  routing (): void {
    console.log('\n= Routing =')
    console.log('----------')
    for (const currentRouter of this.routers) {
      for (const { method, routePath, operationAdapter } of currentRouter.routes) {
        currentRouter.router[method](routePath, operationAdapter.adapt())
        console.log(`${method.toUpperCase()} ${currentRouter.baseRoute}${routePath}`)
      }
      console.log('----------')

      this.router.use(currentRouter.baseRoute, currentRouter.router)
    }
    console.log('\n')
  }
}
