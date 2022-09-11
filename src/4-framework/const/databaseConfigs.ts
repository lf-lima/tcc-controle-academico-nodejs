import { SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import { config } from 'dotenv'
config()

const clearDBFullUrl = process.env.CLEARDB_DATABASE_URL

const [, urlWithDataBase] = clearDBFullUrl?.split('@') as string[]

const [DB_HOST] = urlWithDataBase.split('/')

export const baseSequelizeOptions = {
  database: process.env.DB,
  host: DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', 'mysql', '*.model.ts')]
} as SequelizeOptions
