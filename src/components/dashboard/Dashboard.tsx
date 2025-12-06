import { useState } from 'react'
import { FiDatabase, FiSearch } from 'react-icons/fi'
import TaskCard from './TaskCard'
import TaskFormModal from '../modals/TaskFormModal'
import DeleteConfirmModal from '../modals/DeleteConfirmModal'
import TaskDetailsDrawer from '../modals/TaskDetailsDrawer'
import type { TaskDetails } from '../modals/TaskDetailsDrawer'
import DummyDataConfirmModal from '../modals/DummyDataConfirmModal'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addTask,
  deleteTask,
  moveTask,
  selectSearchQuery,
  selectStatusFilter,
  selectTasks,
  selectVisibleTasks,
  setSearchQuery,
  setStatusFilter,
  updateTask,
} from '../../store/taskSlice'
import { dummyTasks } from '../../data/dummydata'
import type { StatusFilter, TaskPriority, TaskStatus, Task } from '../../types/task'

type ActiveModal =
  | { type: 'add' }
  | { type: 'edit'; taskId: string }
  | { type: 'delete'; taskId: string }
  | null

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  const visibleTasks = useAppSelector(selectVisibleTasks)
  const statusFilter = useAppSelector(selectStatusFilter)
  const searchQuery = useAppSelector(selectSearchQuery)
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const [viewedTask, setViewedTask] = useState<TaskDetails | null>(null)
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showDummyConfirm, setShowDummyConfirm] = useState(false)

  const openAddModal = () => setActiveModal({ type: 'add' })
  const openEditModal = (taskId: string) => setActiveModal({ type: 'edit', taskId })
  const openDeleteModal = (taskId: string) => setActiveModal({ type: 'delete', taskId })
  const closeModal = () => setActiveModal(null)
  const openViewTask = (task: TaskDetails) => setViewedTask(task)
  const closeViewTask = () => setViewedTask(null)

  const handleDragStart = (taskId: string) => () => {
    setDraggingTaskId(taskId)
  }

  const handleDrop = (column: TaskStatus) => {
    if (!draggingTaskId) return
    dispatch(moveTask({ id: draggingTaskId, status: column }))
    setDraggingTaskId(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value))
  }

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev)
  }

  const openDummyConfirm = () => {
    setShowDummyConfirm(true)
  }

  const closeDummyConfirm = () => {
    setShowDummyConfirm(false)
  }

  const handleAddDummyData = () => {
    dummyTasks.forEach((task) => {
      dispatch(
        addTask({
          title: task.title,
          description: task.description,
          status: task.status,
          category: task.category,
          priority: task.priority,
        }),
      )
    })
    setShowDummyConfirm(false)
  }

  const handleStatusFilterChange = (value: StatusFilter) => {
    dispatch(setStatusFilter(value))
  }

  const tasksByStatus = (status: TaskStatus) =>
    visibleTasks.filter((task) => task.status === status)
  const todoTasks = tasksByStatus('todo')
  const pendingTasks = tasksByStatus('pending')
  const completedTasks = tasksByStatus('completed')

  const mapPriorityToLabel = (priority: TaskPriority): string => {
    if (priority === 'high') return 'High'
    if (priority === 'medium') return 'Medium'
    return 'Low'
  }

  const mapTaskToDetails = (task: Task): TaskDetails => ({
    title: task.title,
    label: task.category ?? 'Uncategorized',
    status:
      task.status === 'todo'
        ? 'Todo'
        : task.status === 'pending'
          ? 'In Progress'
          : 'Completed',
    priority: mapPriorityToLabel(task.priority),
    description: task.description,
    daysLeft: task.status === 'completed' ? 0 : 7,
  })

  const editingTask =
    activeModal && activeModal.type === 'edit'
      ? tasks.find((t) => t.id === activeModal.taskId)
      : undefined

  const deletingTask =
    activeModal && activeModal.type === 'delete'
      ? tasks.find((t) => t.id === activeModal.taskId)
      : undefined

  return (
    <div className="space-y-6 px-4 py-4 md:px-8 md:py-6">
      {/* Filters */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          {[
            { label: 'All', value: 'all' as StatusFilter },
            { label: 'Active', value: 'active' as StatusFilter },
            { label: 'Completed', value: 'completed' as StatusFilter },
          ].map((filter) => {
            const isActive = statusFilter === filter.value
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleStatusFilterChange(filter.value)}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Large screen dummy data button */}
          <button
            type="button"
            onClick={openDummyConfirm}
            className="hidden items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-slate-800 md:inline-flex"
          >
            <FiDatabase className="h-4 w-4" />
            <span>Add dummy data</span>
          </button>

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={toggleMobileSearch}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 md:hidden"
            aria-label="Toggle search"
          >
            <FiSearch className="h-4 w-4" />
          </button>

          {/* Mobile dummy data icon button */}
          <button
            type="button"
            onClick={openDummyConfirm}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 md:hidden"
            aria-label="Add dummy data"
          >
            <FiDatabase className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="md:hidden">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 shadow-sm">
            <FiSearch className="mr-2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="flex-1 bg-transparent text-[11px] text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      {/* Todo list */}
      <section
        className="space-y-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop('todo')}
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Todo</h3>
            <span className="h-px w-10 bg-slate-200" />
          </div>
          <span className="text-[11px] text-slate-400">{todoTasks.length} Tasks</span>
        </div>

        <div className="space-y-3">
          {todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              label={task.category ?? 'Task'}
              comments={12}
              checklist={21}
              status={'Todo' as never}
              priority={mapPriorityToLabel(task.priority) as never}
              daysLeft={task.status === 'todo' ? 15 : 12}
              progress={0}
              onView={() => openViewTask(mapTaskToDetails(task))}
              onEdit={() => openEditModal(task.id)}
              draggable
              onDragStart={handleDragStart(task.id)}
            />
          ))}

          <button
            type="button"
            onClick={openAddModal}
            className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-xs font-medium text-slate-500 hover:border-slate-400 hover:bg-slate-50"
          >
            + Add New Task
          </button>
        </div>
      </section>

      {/* Pending list */}
      <section
        className="space-y-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop('pending')}
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              In Progress
            </h3>
            <span className="h-px w-10 bg-slate-200" />
          </div>
          <span className="text-[11px] text-slate-400">{pendingTasks.length} Tasks</span>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              label={task.category ?? 'Task'}
              comments={task.id === '3' ? 11 : 7}
              checklist={task.id === '3' ? 8 : 12}
              status={'In Progress' as never}
              priority={mapPriorityToLabel(task.priority) as never}
              daysLeft={task.id === '3' ? 32 : 4}
              progress={task.id === '3' ? 26 : 74}
              onView={() => openViewTask(mapTaskToDetails(task))}
              onEdit={() => openEditModal(task.id)}
              draggable
              onDragStart={handleDragStart(task.id)}
            />
          ))}
        </div>
      </section>

      {/* Completed list */}
      <section
        className="space-y-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleDrop('completed')}
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Completed
            </h3>
            <span className="h-px w-10 bg-slate-200" />
          </div>
          <span className="text-[11px] text-slate-400">{completedTasks.length} Task</span>
        </div>

        <div className="space-y-3">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              label={task.category ?? 'Task'}
              comments={4}
              checklist={16}
              status={'Completed' as never}
              priority={mapPriorityToLabel(task.priority) as never}
              daysLeft={0}
              progress={100}
              onView={() => openViewTask(mapTaskToDetails(task))}
              onEdit={() => openEditModal(task.id)}
              draggable
              onDragStart={handleDragStart(task.id)}
            />
          ))}
        </div>
      </section>

      {/* Add / Edit task modal */}
      <TaskFormModal
        mode={activeModal?.type === 'edit' ? 'edit' : 'add'}
        isOpen={activeModal !== null && activeModal.type !== 'delete'}
        onClose={closeModal}
        initialTitle={
          activeModal && activeModal.type === 'edit' && editingTask ? editingTask.title : ''
        }
        initialLabel={
          activeModal && activeModal.type === 'edit' && editingTask ? editingTask.category : ''
        }
        initialStatus={
          activeModal && activeModal.type === 'edit' && editingTask
            ? editingTask.status
            : 'todo'
        }
        initialDescription={
          activeModal && activeModal.type === 'edit' && editingTask
            ? editingTask.description
            : ''
        }
        initialPriority={
          activeModal && activeModal.type === 'edit' && editingTask
            ? editingTask.priority
            : 'medium'
        }
        onDeleteClick={
          activeModal && activeModal.type === 'edit'
            ? () => openDeleteModal(activeModal.taskId)
            : undefined
        }
        onSubmit={({ title, description, status, category, priority }) => {
          if (activeModal?.type === 'edit' && editingTask) {
            dispatch(
              updateTask({
                id: editingTask.id,
                changes: { title, description, status, category, priority },
              }),
            )
          } else if (activeModal?.type === 'add') {
            dispatch(addTask({ title, description, status, category, priority }))
          }
        }}
      />

      {/* Dummy data confirm modal */}
      <DummyDataConfirmModal
        isOpen={showDummyConfirm}
        onCancel={closeDummyConfirm}
        onConfirm={handleAddDummyData}
      />

      {/* Delete warning modal */}
      <DeleteConfirmModal
        isOpen={activeModal !== null && activeModal.type === 'delete'}
        taskTitle={
          activeModal && activeModal.type === 'delete' && deletingTask ? deletingTask.title : ''
        }
        onCancel={closeModal}
        onConfirm={() => {
          if (activeModal?.type === 'delete' && deletingTask) {
            dispatch(deleteTask(deletingTask.id))
          }
          closeModal()
        }}
      />

      {/* Right-side task details drawer */}
      <TaskDetailsDrawer isOpen={Boolean(viewedTask)} task={viewedTask} onClose={closeViewTask} />
    </div>
  )
}

export default Dashboard
