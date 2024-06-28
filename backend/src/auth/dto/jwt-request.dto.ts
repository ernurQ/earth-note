import { UserJwtValidated } from '@Auth/models'
import { Request } from 'express'

export interface JwtRequest extends Request {
  user: UserJwtValidated
}
