import { env } from '#business/const/environments'
import { UserRepository } from '#framework/repositories/userRepository'
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export async function authenticationMiddleware (req: any, res: Response, next: NextFunction) {
  try {
    const userRepository = new UserRepository()

    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' })
    }

    const parts = authHeader?.split(' ') as string[]

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (scheme !== 'Bearer') {
      return res.status(401).json({ error: 'Token malformed' })
    }

    const tokenParts = token.split('.') as string[]

    if (tokenParts.length !== 3) {
      return res.status(401).json({ error: 'Token malformed' })
    }

    const payload = jwt.verify(token, env.ACCESS_SECRET as string) as {
      userId: number,
      userEmail: string,
      companyId: number,
      permissions: {
        id: number
        name: string
        description: string
      }[]
    }

    const user = await userRepository.findById(payload.userId)

    if (!user) {
      return res.status(400).json({ error: 'User not exists, redo your login' })
    }

    req.tokenPayload = payload

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, redo your login' })
  }
}
