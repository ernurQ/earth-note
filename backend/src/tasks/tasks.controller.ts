import { JwtRequest } from '@Auth/dto'
import { JwtAuthGuard } from '@Auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateTaskDto } from '@Tasks/dto'
import { Task } from '@Tasks/entities'
import { TasksService } from '@Tasks/tasks.service'

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOkResponse({ description: 'Get all tasks', type: [Task] })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTasks(@Query('projectId') projectId: string) {
    return this.tasksService.getTasksByProjectId(projectId)
  }

  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({ description: 'New task was created', type: Task })
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(
    @Req() req: JwtRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(req.user.id, createTaskDto)
  }
}
