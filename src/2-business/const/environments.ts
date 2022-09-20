import { config } from 'dotenv'
config()

export const env = {
  PORT: process.env.PORT as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASS: process.env.DB_PASS as string,
  ACCESS_SECRET: process.env.ACCESS_SECRET as string,
  BUCKET_NAME: process.env.BUCKET_NAME as string,
  AWS_REGION: process.env.AWS_REGION as string,
  CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL as string,
  EXPIRATION_TIME_IN_SECONDS_TO_DOWNLOAD_URL: process.env.EXPIRATION_TIME_IN_SECONDS_TO_DOWNLOAD_URL as string
}
