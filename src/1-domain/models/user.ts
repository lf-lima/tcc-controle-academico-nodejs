import { IUser } from '#domain/entities/iUser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class User implements IUser {
  id!: number
  password!: string
  profileId!: number
  createdAt?: Date
  updatedAt?: Date

  constructor (user: IUser) {
    Object.assign(this, user)
  }

  public async checkPassword (password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb)
  }

  public async genToken (payload: {
    userId: number,
    userEmail: string,
    companyId: number,
    permissions: { id: number, name:string, description: string}[]
  }): Promise<string> {
    const token = jwt.sign(payload, process.env.ACCESS_SECRET as string, { expiresIn: 604800 })
    return token
  }
}
