import { AuthService } from '@Auth/auth.service'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string) {
    return await this.authService.validateUser(username, password)
  }
}
