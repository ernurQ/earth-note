import { Task } from '@Tasks/entities'
import { User } from '@Users/entities'
import { Expose } from 'class-transformer'
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
  @Expose()
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, (user) => user.projects)
  user?: User

  @Column()
  userId: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column({ type: 'text' })
  description: string

  @Expose()
  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Task, (task) => task.project)
  tasks?: Task[]
}
