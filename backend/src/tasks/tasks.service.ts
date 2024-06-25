import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectsService } from '@Projects/projects.service'
import { CreateTaskDto } from '@Tasks/dto'
import { Task } from '@Tasks/entities'
import { Repository } from 'typeorm'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
  ) {}

  async getTasksByProjectId(projectId: string) {
    return await this.tasksRepository.findBy({ projectId })
  }

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    const project = await this.projectsService.findOneById(
      createTaskDto.projectId,
      userId,
    )
    const newTask = this.tasksRepository.create({ ...createTaskDto, project })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { project: _unused, ...result } =
      await this.tasksRepository.save(newTask)
    return result
  }
}
