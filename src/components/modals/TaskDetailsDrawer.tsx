import React from 'react'
import { FiX, FiClock } from 'react-icons/fi'

type TaskDetails = {
  title: string
  label: string
  status: string
  priority?: string
  description: string
  daysLeft?: number
}

type TaskDetailsDrawerProps = {
  isOpen: boolean
  task?: TaskDetails | null
  onClose: () => void
}

const getPriorityClasses = (priority?: string) => {
  switch (priority) {
    case 'High':
      return 'bg-rose-100 text-rose-700'
    case 'Medium':
      return 'bg-amber-100 text-amber-700'
    case 'Low':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-slate-100 text-slate-500'
  }
}

const TaskDetailsDrawer: React.FC<TaskDetailsDrawerProps> = ({ isOpen, task, onClose }) => {
  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/30">
      <aside className="flex h-full w-full max-w-sm flex-col bg-white px-4 py-4 shadow-xl md:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Task details
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-2">
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            onClick={onClose}
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[11px] font-medium text-slate-500">Category</p>
            <p className="text-xs font-semibold text-slate-800">{task.label}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-[11px] font-medium text-slate-500">Status</p>
              <p className="text-xs font-semibold text-slate-800">{task.status}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-[11px] font-medium text-slate-500">Priority</p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${getPriorityClasses(
                  task.priority,
                )}`}
              >
                {task.priority ?? 'Not set'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
            <FiClock className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-[11px] text-slate-500">Time remaining</p>
              <p className="text-xs font-semibold text-slate-800">
                {task.daysLeft !== undefined ? `${task.daysLeft} days left` : 'Not set'}
              </p>
            </div>
          </div>

          <div className="mt-2 space-y-1.5">
            <p className="text-[11px] font-medium text-slate-500">Description</p>
            <p className="rounded-2xl bg-slate-50 p-3 text-[11px] text-slate-500">
              {task.description || 'No description added yet.'}
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export type { TaskDetails }
export default TaskDetailsDrawer




