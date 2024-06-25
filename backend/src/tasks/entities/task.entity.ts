import { Project } from '@Projects/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Project

  @Column()
  projectId: string

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'boolean', default: false })
  isDone: boolean

  @CreateDateColumn()
  createdAt: Date
}
