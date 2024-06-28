import { SafeUser } from '@Auth/models'
import { Request } from 'express'

export interface loginRequestDto extends Request {
  user: SafeUser
}
