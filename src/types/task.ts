export type TaskStatus = 'todo' | 'pending' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high'

export type StatusFilter = 'all' | 'active' | 'completed'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  completed: boolean
  priority: TaskPriority
  category?: string
  createdAt: string
  updatedAt: string
}
