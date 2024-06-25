import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from '@Auth/auth.controller'
import { AuthService } from '@Auth/auth.service'
import { JwtStrategy } from '@Auth/jwt.strategy'
import { LocalStrategy } from '@Auth/local.strategy'
import { JwtConfig } from '@Config/configuration'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@Users/entities'
import { UsersModule } from '@Users/users.module'

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (jwtConfig: ConfigType<typeof JwtConfig>) => ({
        secret: jwtConfig.secret,
        signOptions: {
          expiresIn: jwtConfig.accessTokenExpiresIn,
        },
      }),
      inject: [JwtConfig.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
