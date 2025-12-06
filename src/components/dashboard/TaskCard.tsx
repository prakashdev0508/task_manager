import React from 'react'
import { FiMessageSquare, FiCheckSquare, FiClock, FiEye, FiEdit2 } from 'react-icons/fi'

type StatusLevel = 'Low' | 'Medium' | 'High' | 'Todo' | 'In Progress' | 'Completed'

type TaskCardProps = {
  title: string
  label: string
  comments: number
  checklist: number
  status: StatusLevel
  priority?: StatusLevel
  daysLeft?: number
  progress?: number
  onView?: () => void
  onEdit?: () => void
  draggable?: boolean
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
}

const badgeStyles: Record<StatusLevel, string> = {
  Todo: 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-sky-100 text-sky-600',
  Completed: 'bg-emerald-100 text-emerald-700',
  High: 'bg-rose-100 text-rose-600',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  label,
  comments,
  checklist,
  status,
  priority,
  daysLeft,
  progress,
  onView,
  onEdit,
  draggable = false,
  onDragStart,
}) => {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 md:flex-row md:items-center md:gap-4"
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex flex-1 items-start gap-3">
        <span className="mt-1 h-8 w-8 shrink-0 rounded-2xl bg-slate-100" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="text-xs text-slate-400">{label}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 md:justify-end">

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[status]}`}
          >
            {status}
          </span>
          {priority && (
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[priority]}`}
            >
              {priority}
            </span>
          )}
        </div>

        {daysLeft !== undefined && (
          <div className="flex items-center gap-1.5">
            <FiClock className="h-4 w-4" />
            <span>{daysLeft} Days left</span>
          </div>
        )}

        {progress !== undefined && (
          <div className="flex items-center gap-2 md:min-w-[110px]">
            <div className="h-1.5 flex-1 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-slate-900"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500">{progress}%</span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100"
            onClick={onView}
          >
            <FiEye className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800"
            onClick={onEdit}
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard


