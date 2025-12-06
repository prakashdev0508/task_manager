import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { StatusFilter, Task, TaskPriority, TaskStatus } from '../types/task'

export type TaskState = {
  tasks: Task[]
  searchQuery: string
  statusFilter: StatusFilter
}

const STORAGE_KEY = 'task-tracker-tasks'

const getDefaultTasks = (): Task[] => []

const loadTasksFromStorage = (): Task[] => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return getDefaultTasks()
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultTasks()
    const parsed = JSON.parse(raw) as Task[]
    if (!Array.isArray(parsed)) return getDefaultTasks()
    return parsed
  } catch {
    return getDefaultTasks()
  }
}

const persistTasks = (tasks: Task[]) => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }catch (error) {
    console.error('Error persisting tasks:', error)
  }
}

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  searchQuery: '',
  statusFilter: 'all',
}

type AddTaskPayload = {
  title: string
  description: string
  status?: TaskStatus
  category?: string
  priority?: TaskPriority
  startDate?: string
  endDate?: string
}

type UpdateTaskPayload = {
  id: string
  changes: Partial<
    Pick<
      Task,
      'title' | 'description' | 'status' | 'completed' | 'category' | 'priority' | 'startDate' | 'endDate'
    >
  >
}

type MoveTaskPayload = {
  id: string
  status: TaskStatus
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
        persistTasks(state.tasks)
      },
      prepare: (payload: AddTaskPayload) => {
        const now = new Date().toISOString()
        return {
          payload: {
            id: nanoid(),
            title: payload.title,
            description: payload.description,
            status: payload.status ?? 'todo',
            completed: payload.status === 'completed',
            priority: payload.priority ?? 'medium',
            category: payload.category?.trim() || undefined,
            startDate: payload.startDate || undefined,
            endDate: payload.endDate || undefined,
            createdAt: now,
            updatedAt: now,
          } satisfies Task,
        }
      },
    },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (!task) return

      if (action.payload.changes.title !== undefined) {
        task.title = action.payload.changes.title
      }
      if (action.payload.changes.description !== undefined) {
        task.description = action.payload.changes.description
      }
      if (action.payload.changes.category !== undefined) {
        task.category = action.payload.changes.category
          ? action.payload.changes.category.trim()
          : undefined
      }
      if (action.payload.changes.priority !== undefined) {
        task.priority = action.payload.changes.priority
      }
      if (action.payload.changes.startDate !== undefined) {
        task.startDate = action.payload.changes.startDate || undefined
      }
      if (action.payload.changes.endDate !== undefined) {
        task.endDate = action.payload.changes.endDate || undefined
      }
      if (action.payload.changes.status !== undefined) {
        task.status = action.payload.changes.status
        task.completed = action.payload.changes.status === 'completed'
      }
      if (action.payload.changes.completed !== undefined) {
        task.completed = action.payload.changes.completed
        if (action.payload.changes.completed) {
          task.status = 'completed'
        }
      }
      task.updatedAt = new Date().toISOString()
      persistTasks(state.tasks)
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
      persistTasks(state.tasks)
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (!task) return
      task.completed = !task.completed
      task.status = task.completed ? 'completed' : 'todo'
      task.updatedAt = new Date().toISOString()
      persistTasks(state.tasks)
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (!task) return
      task.status = action.payload.status
      task.completed = action.payload.status === 'completed'
      task.updatedAt = new Date().toISOString()
      persistTasks(state.tasks)
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
      persistTasks(state.tasks)
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((t) => !t.completed)
      persistTasks(state.tasks)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.statusFilter = action.payload
    },
  },
})

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompleted,
  moveTask,
  setTasks,
  clearCompleted,
  setSearchQuery,
   setStatusFilter,
} = taskSlice.actions

export const selectTasks = (state: { task: TaskState }) => state.task.tasks
export const selectSearchQuery = (state: { task: TaskState }) => state.task.searchQuery
export const selectStatusFilter = (state: { task: TaskState }) => state.task.statusFilter

export const selectVisibleTasks = (state: { task: TaskState }) => {
  const { tasks, searchQuery, statusFilter } = state.task

  const normalizedQuery = searchQuery.trim().toLowerCase()

  let filtered = tasks

  if (normalizedQuery) {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.description.toLowerCase().includes(normalizedQuery) ||
        (task.category && task.category.toLowerCase().includes(normalizedQuery)),
    )
  }

  if (statusFilter === 'active') {
    filtered = filtered.filter((task) => !task.completed)
  } else if (statusFilter === 'completed') {
    filtered = filtered.filter((task) => task.completed)
  }

  return filtered
}

export const selectTasksByStatus =
  (status: TaskStatus) =>
  (state: { task: TaskState }) =>
    state.task.tasks.filter((task) => task.status === status)
export const selectTaskById =
  (id: string) =>
  (state: { task: TaskState }) =>
    state.task.tasks.find((task) => task.id === id)

export default taskSlice.reducer