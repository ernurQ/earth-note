import { AuthService } from '@Auth/auth.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: any, password: any) {
    if (typeof username !== 'string')
      throw new BadRequestException('username must be string.')
    if (typeof password !== 'string')
      throw new BadRequestException('password must be string.')

    return await this.authService.validateUser(username, password)
  }
}
