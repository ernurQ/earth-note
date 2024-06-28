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
import { CreateTaskDto } from '@Tasks/dto'
import { TasksService } from '@Tasks/tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTasks(@Query('projectId') projectId: string) {
    console.log('work')
    return this.tasksService.getTasksByProjectId(projectId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(
    @Req() req: JwtRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(req.user.id, createTaskDto)
  }
}
