import type { TaskPriority, TaskStatus } from '../types/task'

type DummyTaskInput = {
  title: string
  description: string
  status: TaskStatus
  category: string
  priority: TaskPriority
  startDate?: string
  endDate?: string
}

export const dummyTasks: DummyTaskInput[] = [
  {
    title: 'Plan weekly grocery shopping',
    description: 'List ingredients for dinners and snacks for the next 7 days.',
    status: 'todo',
    category: 'Personal',
    priority: 'medium',
    startDate: '2025-12-01',
    endDate: '2025-12-07',
  },
  {
    title: 'Prepare client presentation',
    description: 'Update slides with latest metrics and rehearse key talking points.',
    status: 'pending',
    category: 'Work',
    priority: 'high',
    startDate: '2025-12-02',
    endDate: '2025-12-10',
  },
  {
    title: 'Schedule dentist appointment',
    description: 'Call clinic and book a routine check-up for next month.',
    status: 'todo',
    category: 'Health',
    priority: 'low',
    startDate: '2025-12-05',
    endDate: '2026-01-05',
  },
  {
    title: 'Clean email inbox',
    description: 'Archive old threads and respond to important unread messages.',
    status: 'pending',
    category: 'Admin',
    priority: 'medium',
    startDate: '2025-11-25',
    endDate: '2025-12-15',
  },
  {
    title: 'Pay electricity bill',
    description: 'Pay the current month utility bill via online banking.',
    status: 'completed',
    category: 'Finance',
    priority: 'medium',
    startDate: '2025-11-30',
    endDate: '2025-12-03',
  },
]


