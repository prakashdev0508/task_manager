import React from 'react'
import { FiDatabase } from 'react-icons/fi'
import Modal from './Modal'

type DummyDataConfirmModalProps = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

const DummyDataConfirmModal: React.FC<DummyDataConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Add dummy data"
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
          >
            <FiDatabase className="h-4 w-4" />
            <span>Add dummy data</span>
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <FiDatabase className="h-4 w-4" />
        </div>
        <div className="space-y-1 text-xs text-slate-600">
          <p className="font-medium text-slate-900">
            Are you sure you want to add sample dummy tasks?
          </p>
          <p className="text-[11px] text-slate-500">
            Dummy tasks will be added to your current list and stored in your browser until you
            clear them.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default DummyDataConfirmModal


