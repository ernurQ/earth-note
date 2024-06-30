import { JwtRequest } from '@Auth/dto'
import { JwtAuthGuard } from '@Auth/jwt-auth.guard'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateProjectDto } from '@Projects/dto'
import { ProjectsService } from '@Projects/projects.service'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getProjects(@Req() req: JwtRequest) {
    return this.projectsService.getProjects(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createProject(
    @Req() req: JwtRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const newProject = await this.projectsService.createProject(
      req.user.id,
      createProjectDto,
    )
    return newProject
  }
}
