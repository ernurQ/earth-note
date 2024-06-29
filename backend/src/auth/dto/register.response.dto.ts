import { ApiProperty } from '@nestjs/swagger'

export class RegisterResponseDto {
  @ApiProperty()
  username: string
}
