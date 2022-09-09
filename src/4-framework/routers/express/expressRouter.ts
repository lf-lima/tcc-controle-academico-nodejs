import { Router } from 'express'
import { IBaseRouter } from '../base/iBaseRouter'

export type IExpressRouter = IBaseRouter<Router>

export class ExpressRouter implements IExpressRouter {
  public router!: Router
  public route!: string

  constructor (route: string) {
    this.route = route
    this.router = Router()
  }
}
