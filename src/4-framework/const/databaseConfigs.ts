import { SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import { config } from 'dotenv'
config()

let host = process.env.DB_HOST as string

if (process.env.CLEARDB_DATABASE_URL) {
  const clearDBFullUrl = process.env.CLEARDB_DATABASE_URL

  const [, urlWithDataBase] = clearDBFullUrl?.split('@') as string[]

  host = urlWithDataBase.split('/')[0]
}

export const baseSequelizeOptions = {
  host,
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', 'mysql', '*.model.ts')]
} as SequelizeOptions
