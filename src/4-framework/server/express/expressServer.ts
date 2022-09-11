import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { IBaseServer } from '#framework/server/base/iBaseServer'
import { port } from '#framework/const/port'
import { IMainExpressRouter, MainExpressRouter } from '#framework/routers/express/mainExpressRouter'

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
    this.app.listen(process.env.PORT || port, () => {
      console.log('SERVER ON')
      console.log(`Listen in http://localhost:${port}\n`)
    })
  }

  public middlewares (): void {
    this.app.use(cors({
      origin: '*'
    }))
    this.app.use(express.json())
  }

  public routes (): void {
    this.mainRouter.routing()

    this.app.use(this.mainRouter.router)
  }
}
