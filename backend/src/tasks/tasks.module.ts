import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsModule } from '@Projects/projects.module'
import { Task } from '@Tasks/entities'
import { TasksController } from '@Tasks/tasks.controller'
import { TasksService } from '@Tasks/tasks.service'

@Module({
  imports: [ProjectsModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
