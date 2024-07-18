import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectsService } from '@Projects/projects.service'
import { CreateTaskDto, UpdateTaskDto } from '@Tasks/dto'
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
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      project,
      userId: userId,
    })
    return await this.tasksRepository.save(newTask)
  }

  async validateTaskOwnership(taskId: string, userId: string) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, userId: userId },
    })
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return task
  }

  async deleteTask(task: Task) {
    return this.tasksRepository.remove(task)
  }

  async updateTask(oldTask: Task, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({
      ...oldTask,
      ...updateTaskDto,
    })
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return this.tasksRepository.save(task)
  }

  async toggleDone(taskId: string) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } })
    if (!task) {
      throw new NotFoundException('Task not found')
    }

    task.isDone = !task.isDone

    return await this.tasksRepository.save(task)
  }
}
