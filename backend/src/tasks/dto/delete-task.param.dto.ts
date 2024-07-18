import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class DeleteTaskParamDto {
  @ApiProperty()
  @IsString()
  id: string
}
