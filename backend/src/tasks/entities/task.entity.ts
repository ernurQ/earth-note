import { ApiProperty } from '@nestjs/swagger'
import { Project } from '@Projects/entities'
import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('tasks')
export class Task {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Project

  @Column()
  projectId: string

  @ApiProperty()
  @Expose()
  @Column()
  title: string

  @ApiProperty()
  @Expose()
  @Column({ type: 'text' })
  content: string

  @ApiProperty()
  @Expose()
  @Column({ type: 'boolean', default: false })
  isDone: boolean

  @ApiProperty()
  @Expose()
  @CreateDateColumn()
  createdAt: Date
}
