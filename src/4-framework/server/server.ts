import { App } from '#framework/app/app'
import { ExpressServer } from '#framework/server/express/expressServer'
import { SequelizeConnection } from '#framework/database/sequelize/sequelizeConnection'
import { SequelizeMysqlConfig } from '#framework/database/sequelize/sequelizeConfig'

const app = new App(new ExpressServer(), new SequelizeConnection(new SequelizeMysqlConfig()))

app.server.connection()
