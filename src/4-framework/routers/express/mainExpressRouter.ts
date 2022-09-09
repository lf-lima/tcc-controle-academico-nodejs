import { Router } from 'express'
import { routers } from '../../const/routers'
import { IBaseRouter } from '../base/iBaseRouter'
import { IMainRouter } from '../base/iMainRouter'

export type IMainExpressRouter = IMainRouter<Router>

export class MainExpressRouter implements IMainExpressRouter {
  public router!: Router
  public routers!: IBaseRouter<Router>[]

  constructor () {
    this.router = Router()
    this.routers = routers
  }

  routing (): void {
    for (const currentRouter of this.routers) {
      this.router.use(currentRouter.route, currentRouter.router)
    }
  }
}
