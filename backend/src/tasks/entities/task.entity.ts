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
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Project

  @Column()
  projectId: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column({ type: 'text' })
  content: string

  @Expose()
  @Column({ type: 'boolean', default: false })
  isDone: boolean

  @Expose()
  @CreateDateColumn()
  createdAt: Date
}
