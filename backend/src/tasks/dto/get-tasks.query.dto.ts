import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GetTasksQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  projectId: string
}
