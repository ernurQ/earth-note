import { UserJwtTokenPayload } from '@Auth/models'
import { DatabaseConfig, JwtConfig } from '@Config/configuration'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    @Inject(DatabaseConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof DatabaseConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: UserJwtTokenPayload) {
    return { userId: payload.sub, username: payload.username }
  }
}
