import { configureStore } from '@reduxjs/toolkit'
import taskReducer, { type TaskState } from './taskSlice'

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
})

export type RootState = {
  task: TaskState
}

export type AppDispatch = typeof store.dispatch
