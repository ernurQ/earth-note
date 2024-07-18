import { JwtRequest } from '@Auth/dto'
import { JwtAuthGuard } from '@Auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
import {
  CreateTaskDto,
  DeleteTaskParamDto,
  GetTasksQueryDto,
  UpdateTaskDto,
} from '@Tasks/dto'
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

  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Task Id that you want to update',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Req() { user }: JwtRequest,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.validateTaskOwnership(taskId, user.id)

    return this.tasksService.updateTask(task, updateTaskDto)
  }

  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-done')
  async toggleDone(@Param('id') taskId: string, @Req() { user }: JwtRequest) {
    await this.tasksService.validateTaskOwnership(taskId, user.id)

    return this.tasksService.toggleDone(taskId)
  }
}
