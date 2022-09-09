import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { IBaseServer } from '../base/iBaseServer'
import { port } from '../../const/port'
import { IMainExpressRouter, MainExpressRouter } from '../../routers/express/mainExpressRouter'

export interface IExpressServer extends IBaseServer<Router> {
  app: express.Application
}

export class ExpressServer implements IExpressServer {
  public app: express.Application
  public mainRouter: IMainExpressRouter

  constructor () {
    this.app = express()
    this.mainRouter = new MainExpressRouter()

    this.middlewares()
    this.routes()
  }

  connection (): void {
    this.app.listen(port, () => {
      console.log('SERVER ON')
      console.log(`Listen in http://localhost:${port}`)
    })
  }

  public middlewares (): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(express.json())
  }

  public routes (): void {
    this.mainRouter.routing()

    this.app.use(this.mainRouter.router)
  }
}
