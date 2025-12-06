import React, { useEffect, useState } from 'react'
import { FiPlus, FiEdit2 } from 'react-icons/fi'
import Modal from './Modal'
import type { TaskPriority, TaskStatus } from '../../types/task'

type TaskFormModalProps = {
  mode: 'add' | 'edit'
  isOpen: boolean
  onClose: () => void
  initialTitle?: string
  initialLabel?: string
  initialStatus?: TaskStatus
  initialDescription?: string
  initialPriority?: TaskPriority
  onDeleteClick?: () => void
  onSubmit: (values: {
    title: string
    description: string
    status: TaskStatus
    category?: string
    priority: TaskPriority
  }) => void
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  mode,
  isOpen,
  onClose,
  initialTitle = '',
  initialLabel = '',
  initialStatus = 'todo',
  initialDescription = '',
  initialPriority = 'medium',
  onDeleteClick,
  onSubmit,
}) => {
  const title = mode === 'add' ? 'Add new task' : 'Edit task'
  const primaryLabel = mode === 'add' ? 'Add task' : 'Save changes'
  const Icon = mode === 'add' ? FiPlus : FiEdit2

  const [titleValue, setTitleValue] = useState(initialTitle)
  const [statusValue, setStatusValue] = useState<TaskStatus>(initialStatus)
  const [notesValue, setNotesValue] = useState(initialDescription)
  const [categoryValue, setCategoryValue] = useState(initialLabel)
  const [priorityValue, setPriorityValue] = useState<TaskPriority>(initialPriority)
  const [errors, setErrors] = useState<{
    title?: string
    category?: string
    description?: string
  }>({})

  useEffect(() => {
    setTitleValue(initialTitle)
  }, [initialTitle])

  useEffect(() => {
    setStatusValue(initialStatus)
  }, [initialStatus])

  useEffect(() => {
    setNotesValue(initialDescription)
  }, [initialDescription])

  useEffect(() => {
    setCategoryValue(initialLabel)
  }, [initialLabel])

  useEffect(() => {
    setPriorityValue(initialPriority)
  }, [initialPriority])

  const handlePrimaryClick = () => {
    const trimmedTitle = titleValue.trim()
    const trimmedCategory = categoryValue.trim()
    const trimmedNotes = notesValue.trim()

    const validationErrors: {
      title?: string
      category?: string
      description?: string
    } = {}

    if (!trimmedTitle) {
      validationErrors.title = 'Title is required.'
    }
    if (!trimmedCategory) {
      validationErrors.category = 'Category is required.'
    }
    if (!trimmedNotes) {
      validationErrors.description = 'Description is required.'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    onSubmit({
      title: trimmedTitle,
      description: trimmedNotes,
      status: statusValue,
      category: trimmedCategory,
      priority: priorityValue,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
          {mode === 'edit' && onDeleteClick && (
            <button
              type="button"
              onClick={onDeleteClick}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 sm:flex-none sm:px-5"
            >
              Delete task
            </button>
          )}
          <button
            type="button"
            onClick={handlePrimaryClick}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 sm:flex-none sm:px-5"
          >
            <Icon className="h-4 w-4" />
            <span>{primaryLabel}</span>
          </button>
        </div>
      }
    >
      <form className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Task title</label>
          <input
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            placeholder="Enter task title"
            className={`w-full rounded-xl border px-3 py-2 text-xs text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:bg-white ${
              errors.title
                ? 'border-rose-300 bg-rose-50 focus:border-rose-400'
                : 'border-slate-200 bg-slate-50 focus:border-slate-400'
            }`}
          />
          {errors.title && (
            <p className="text-[11px] font-medium text-rose-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Category / label</label>
          <input
            value={categoryValue}
            onChange={(event) => setCategoryValue(event.target.value)}
            placeholder="e.g. Appointment, Delivery"
            className={`w-full rounded-xl border px-3 py-2 text-xs text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:bg-white ${
              errors.category
                ? 'border-rose-300 bg-rose-50 focus:border-rose-400'
                : 'border-slate-200 bg-slate-50 focus:border-slate-400'
            }`}
          />
          {errors.category && (
            <p className="text-[11px] font-medium text-rose-500">{errors.category}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Status</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none ring-0 focus:border-slate-400 focus:bg-white"
            value={statusValue}
            onChange={(event) =>
              setStatusValue(event.target.value.toLowerCase() as TaskStatus)
            }
          >
            <option value="todo">Todo</option>
            <option value="pending">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Priority</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none ring-0 focus:border-slate-400 focus:bg-white"
            value={priorityValue}
            onChange={(event) => setPriorityValue(event.target.value as TaskPriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Start date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">End date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Notes</label>
          <textarea
            rows={3}
            placeholder="Add a short description..."
            className={`w-full resize-none rounded-xl border px-3 py-2 text-xs text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:bg-white ${
              errors.description
                ? 'border-rose-300 bg-rose-50 focus:border-rose-400'
                : 'border-slate-200 bg-slate-50 focus:border-slate-400'
            }`}
            value={notesValue}
            onChange={(event) => setNotesValue(event.target.value)}
          />
          {errors.description && (
            <p className="text-[11px] font-medium text-rose-500">{errors.description}</p>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default TaskFormModal


