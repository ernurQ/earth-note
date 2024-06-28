import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@Users/entities'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneById(userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId })
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return user
  }

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username: username })
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return user
  }
}
