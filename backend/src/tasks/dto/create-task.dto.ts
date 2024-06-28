import { IsString } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsString()
  projectId: string
}
