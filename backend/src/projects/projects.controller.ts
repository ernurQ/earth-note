import { JwtRequest } from '@Auth/dto'
import { JwtAuthGuard } from '@Auth/jwt-auth.guard'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateProjectDto } from '@Projects/dto'
import { Project } from '@Projects/entities'
import { ProjectsService } from '@Projects/projects.service'

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOkResponse({ description: 'Return user`s projects', type: [Project] })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getProjects(@Req() req: JwtRequest) {
    return this.projectsService.getProjects(req.user.id)
  }

  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ description: 'New project was created', type: Project })
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
