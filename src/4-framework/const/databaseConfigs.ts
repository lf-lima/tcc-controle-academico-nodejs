import { SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import { config } from 'dotenv'
config()

export const baseSequelizeOptions = {
  database: process.env.DB,
  host: process.env.CLEARDB_DATABASE_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [path.resolve(__dirname, '..', 'models', 'mysql', '*.model.ts')]
} as SequelizeOptions
