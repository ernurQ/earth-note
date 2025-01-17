import { Project } from '@Projects/entities'
import { Task } from '@Tasks/entities'
import bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[]

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks?: Task[]

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
  }
}
