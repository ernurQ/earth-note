import { Task } from '@Tasks/entities'
import { User } from '@Users/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, (user) => user.projects)
  user?: User

  @Column()
  userId: string

  @Column()
  title: string

  @Column({ type: 'text' })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Task, (task) => task.project)
  tasks?: Task[]
}
