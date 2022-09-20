import { SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import { env } from '#business/const/environments'

let host = env.DB_HOST as string

if (env.CLEARDB_DATABASE_URL) {
  const clearDBFullUrl = env.CLEARDB_DATABASE_URL

  const [, urlWithDataBase] = clearDBFullUrl?.split('@') as string[]

  host = urlWithDataBase.split('/')[0]
}

export const baseSequelizeOptions = {
  host,
  database: env.DB_NAME,
  username: env.DB_USER as string,
  password: env.DB_PASS as string,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', 'mysql', '*.model.ts')]
} as SequelizeOptions
