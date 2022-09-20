import { env } from '#business/const/environments'
import { TokenPayload } from '#domain/models/token'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export abstract class User {
  public static async checkPassword (password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb)
  }

  public static async genToken (payload: TokenPayload): Promise<string> {
    const token = jwt.sign(payload, env.ACCESS_SECRET as string, { expiresIn: 604800 })
    return token
  }
}
