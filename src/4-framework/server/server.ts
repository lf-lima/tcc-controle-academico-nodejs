import { App } from '../app/app'
import { ExpressServer } from './express/expressServer'
import { SequelizeConnection } from '../database/sequelize/sequelizeConnection'
import { SequelizeMysqlConfig } from '../database/sequelize/sequelizeConfig'

const app = new App(new ExpressServer(), new SequelizeConnection(new SequelizeMysqlConfig()))

app.server.connection()
