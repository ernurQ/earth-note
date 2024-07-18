import { OmitType, PartialType } from '@nestjs/swagger'
import { Task } from '@Tasks/entities'

export class UpdateTaskDto extends PartialType(
  OmitType(Task, [
    'id',
    'createdAt',
    'isDone',
    'project',
    'projectId',
    'user',
    'userId',
  ] as const),
) {}
