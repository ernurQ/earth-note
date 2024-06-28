import { Project } from '@Projects/entities'

export interface CreateProjectDto
  extends Omit<Project, 'id' | 'user' | 'createdAt' | 'tasks'> {}
