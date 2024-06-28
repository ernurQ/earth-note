import { registerAs } from '@nestjs/config'

export const AppConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
}))

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
}))

export const DatabaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
}))
