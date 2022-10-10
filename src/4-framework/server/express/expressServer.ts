import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port } from '#framework/const/port'
import { IMainExpressRouter, MainExpressRouter } from '#framework/routers/express/mainExpressRouter'
import { IDBConnection } from '#framework/database/base/iConnection'
import { Seeder } from '#framework/migrations/seeder'
import { env } from '#business/const/environments'
import { createServer } from 'http'
import { Server } from 'socket.io'

export class ExpressServer<TDBConfig> {
  private app: express.Application
  private mainRouter: IMainExpressRouter
  private dbConnection: IDBConnection<TDBConfig>
  private seeder: Seeder

  constructor (dbConnection: IDBConnection<TDBConfig>) {
    this.seeder = new Seeder()
    this.app = express()
    this.mainRouter = new MainExpressRouter()
    this.dbConnection = dbConnection

    this.connection()
  }

  async connection (): Promise<void> {
    await this.database()
    await this.migrations()

    const httpServer = createServer(this.app)
    const io = new Server(httpServer, { cors: { origin: '*' } })

    const messages: any[] = []

    io.on('connection', socket => {
      socket.emit('message:render-olds', messages)

      let username = ''
      socket.on('user:enter', (_username) => {
        username = _username
        console.log(`New user: ${username}`)
      })

      socket.on('message:send', (message) => {
        const messageData = {
          username,
          message
        }

        messages.push(messageData)

        socket.broadcast.emit('message:new', messageData)
      })
    })

    this.middlewares()
    this.routes()

    httpServer.listen(env.PORT || port, () => {
      console.log('SERVER ON')
      console.log(`Listen in http://localhost:${port}\n`)
    })
  }

  public middlewares (): void {
    this.app.use(cors({ origin: '*' }))
    this.app.use(express.json())
    this.app.use(bodyParser.urlencoded())
  }

  public routes (): void {
    this.mainRouter.routing()

    this.app.use(this.mainRouter.router)
  }

  async database (): Promise<void> {
    await this.dbConnection.connect()
  }

  async migrations (): Promise<void> {
    await this.seeder.run()
  }
}
