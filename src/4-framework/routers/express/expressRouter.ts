import { Router } from 'express'
import { IBaseRouter, IRoute } from '#framework/routers/base/iBaseRouter'

export type IExpressRouter = IBaseRouter<Router>

export class ExpressRouter implements IExpressRouter {
  public router!: Router
  public baseRoute!: string
  public routes!: IRoute[]

  constructor (baseRoute: string, routes: IRoute[]) {
    this.baseRoute = baseRoute
    this.router = Router()
    this.routes = routes
  }
}
