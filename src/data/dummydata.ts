import type { TaskPriority, TaskStatus } from '../types/task'

type DummyTaskInput = {
  title: string
  description: string
  status: TaskStatus
  category: string
  priority: TaskPriority
}

export const dummyTasks: DummyTaskInput[] = [
  {
    title: 'Plan weekly grocery shopping',
    description: 'List ingredients for dinners and snacks for the next 7 days.',
    status: 'todo',
    category: 'Personal',
    priority: 'medium',
  },
  {
    title: 'Prepare client presentation',
    description: 'Update slides with latest metrics and rehearse key talking points.',
    status: 'pending',
    category: 'Work',
    priority: 'high',
  },
  {
    title: 'Schedule dentist appointment',
    description: 'Call clinic and book a routine check-up for next month.',
    status: 'todo',
    category: 'Health',
    priority: 'low',
  },
  {
    title: 'Clean email inbox',
    description: 'Archive old threads and respond to important unread messages.',
    status: 'pending',
    category: 'Admin',
    priority: 'medium',
  },
  {
    title: 'Pay electricity bill',
    description: 'Pay the current month utility bill via online banking.',
    status: 'completed',
    category: 'Finance',
    priority: 'medium',
  },
]


