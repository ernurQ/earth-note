import { JwtRequest } from '@Auth/dto'
import { JwtAuthGuard } from '@Auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  OmitType,
} from '@nestjs/swagger'
import { ProjectsService } from '@Projects/projects.service'
import { CreateTaskDto, DeleteTaskParamDto, GetTasksQueryDto } from '@Tasks/dto'
import { Task } from '@Tasks/entities'
import { TasksService } from '@Tasks/tasks.service'

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService,
  ) {}

  @ApiOkResponse({ description: 'Get all tasks', type: [Task] })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTasks(
    @Query() query: GetTasksQueryDto,
    @Req() { user }: JwtRequest,
  ) {
    await this.projectsService.validateProjectOwnership(
      query.projectId,
      user.id,
    )
    return this.tasksService.getTasksByProjectId(query.projectId)
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

  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiOkResponse({
    description: 'Task was deleted',
    type: OmitType(Task, ['id'] as const),
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Task ID that you want to delete',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(
    @Param() deleteTaskParam: DeleteTaskParamDto,
    @Req() { user }: JwtRequest,
  ) {
    const task = await this.tasksService.validateTaskOwnership(
      deleteTaskParam.id,
      user.id,
    )

    return this.tasksService.deleteTask(task)
  }
}
