import express, { Router } from 'express'
import cors from 'cors'
import { IBaseServer } from '#framework/server/base/iBaseServer'
import { port } from '#framework/const/port'
import { IMainExpressRouter, MainExpressRouter } from '#framework/routers/express/mainExpressRouter'
import { IDBConnection } from '#framework/database/base/iConnection'

export interface IExpressServer extends IBaseServer<Router> {
  app: express.Application
}

export class ExpressServer<TDBConfig> implements IExpressServer {
  public app: express.Application
  public mainRouter: IMainExpressRouter
  public dbConnection: IDBConnection<TDBConfig>

  constructor (dbConnection: IDBConnection<TDBConfig>) {
    this.app = express()
    this.mainRouter = new MainExpressRouter()
    this.dbConnection = dbConnection

    this.connection()
  }

  async connection (): Promise<void> {
    await this.database()

    this.middlewares()
    this.routes()

    this.app.listen(process.env.PORT || port, () => {
      console.log('SERVER ON')
      console.log(`Listen in http://localhost:${port}\n`)
    })
  }

  public middlewares (): void {
    this.app.use(cors({ origin: '*' }))
    this.app.use(express.json())
  }

  public routes (): void {
    this.mainRouter.routing()

    this.app.use(this.mainRouter.router)
  }

  async database (): Promise<void> {
    await this.dbConnection.connect()
  }
}
