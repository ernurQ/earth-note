import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Project } from '@Projects/entities'
import { ProjectsController } from '@Projects/projects.controller'
import { ProjectsService } from '@Projects/projects.service'
import { Task } from '@Tasks/entities'
import { UsersModule } from '@Users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task]), UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
