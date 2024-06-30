import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from '@Projects/entities'
import { UsersService } from '@Users/users.service'
import { CreateProjectDto } from 'src/projects/dto'
import { Repository } from 'typeorm'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async findOneById(projectId: string, userId?: string) {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, userId },
    })
    if (!project) {
      throw new BadRequestException('Project not found')
    }
    return project
  }

  async getProjects(userId: string) {
    return this.projectsRepository.find({ where: { userId } })
  }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    const user = await this.usersService.findOneById(userId)
    const newProject = this.projectsRepository.create({
      ...createProjectDto,
      user,
    })
    return await this.projectsRepository.save(newProject)
  }
}
