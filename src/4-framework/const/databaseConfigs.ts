import { SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import { config } from 'dotenv'
config()

let database: string
let host: string
let username: string
let password: string

if (!process.env.CLEARDB_DATABASE_URL) {
  database = process.env.DB_LOCAL as string
  host = process.env.DB_HOST_LOCAL as string
  username = process.env.DB_USER_LOCAL as string
  password = process.env.DB_PASS_LOCAL as string
} else {
  const clearDBFullUrl = process.env.CLEARDB_DATABASE_URL

  const [, urlWithDataBase] = clearDBFullUrl?.split('@') as string[]

  database = process.env.DB as string
  host = urlWithDataBase.split('/')[0]
  username = process.env.DB_USER as string
  password = process.env.DB_PASS as string
}

export const baseSequelizeOptions = {
  database,
  host,
  username,
  password,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', 'mysql', '*.model.ts')]
} as SequelizeOptions
