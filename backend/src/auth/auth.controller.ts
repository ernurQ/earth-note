import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from '@Auth/auth.service'
import {
  LoginDto,
  loginRequestDto,
  RegisterDto,
  RegisterResponseDto,
} from '@Auth/dto'
import { LocalAuthGuard } from '@Auth/local-auth.guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({
    description: 'Username and password must be string',
  })
  @ApiUnauthorizedResponse({ description: 'Incorrect password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Req() req: loginRequestDto) {
    return this.authService.login(req.user)
  }

  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'Register successful',
    type: RegisterResponseDto,
  })
  @ApiConflictResponse({ description: 'Username already exists' })
  @Post('/register')
  async register(@Body() registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto)
  }
}
