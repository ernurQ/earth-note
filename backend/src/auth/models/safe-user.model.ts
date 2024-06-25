import { User } from '@Users/entities'

export interface SafeUser extends Omit<User, 'password'> {}
