import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'

import { RegisterUserDto } from '@Auth/dto'
import { SafeUser, UserJwtTokenPayload } from '@Auth/models'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@Users/entities'
import { UsersService } from '@Users/users.service'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SafeUser> {
    const user = await this.usersService.findOneByUsername(username)
    const { password, ...result } = user

    const isCorrectPassword = await bcrypt.compare(pass, password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException()
    }

    return result
  }

  async login(user: SafeUser) {
    const payload: UserJwtTokenPayload = {
      sub: user.id,
      username: user.username,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const userExists = await this.usersRepository.findOneBy({
      username: registerUserDto.username,
    })
    if (userExists) {
      throw new ConflictException('Username already exists')
    }

    const newUser = this.usersRepository.create(registerUserDto)
    return this.usersRepository.save(newUser)
  }
}
