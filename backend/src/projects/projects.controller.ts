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
    // TODO: delete userId from response
    // 	{
    // 		"userId": "fcd3c5e1-0514-403a-a46f-718cb3c3fbbe",
    // 		"title": "first",
    // 		"description": "hello world 11111111111111111111111",
    // 		"id": 4,
    // 		"createdAt": "2024-06-24T10:52:21.216Z"
    // }
    return this.projectsService.createProject(req.user.id, createProjectDto)
  }
}
