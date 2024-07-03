import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsString()
  projectId: string
}
