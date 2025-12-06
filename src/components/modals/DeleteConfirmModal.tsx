import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Modal from './Modal'

type DeleteConfirmModalProps = {
  isOpen: boolean
  taskTitle?: string
  onCancel: () => void
  onConfirm: () => void
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  taskTitle,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete task"
      onClose={onCancel}
      footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-medium text-white hover:bg-rose-700"
          >
            <FiTrash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <FiTrash2 className="h-4 w-4" />
        </div>
        <div className="space-y-1 text-xs text-slate-600">
          <p className="font-medium text-slate-900">Are you sure you want to delete this task?</p>
          {taskTitle && <p className="text-[11px] text-slate-500">“{taskTitle}”</p>}
          <p className="text-[11px] text-slate-400">
            This action can&apos;t be undone. You will need to recreate the task if you change your
            mind.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal




