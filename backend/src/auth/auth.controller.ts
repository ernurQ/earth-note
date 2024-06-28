import { AuthService } from '@Auth/auth.service'
import { loginRequestDto, RegisterDto } from '@Auth/dto'
import { LocalAuthGuard } from '@Auth/local-auth.guard'
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: loginRequestDto) {
    return this.authService.login(req.user)
  }

  @Post('/register')
  async register(@Body() registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto)
  }
}
