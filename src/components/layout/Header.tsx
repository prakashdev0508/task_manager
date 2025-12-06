import React from 'react'
import { FiSearch, FiBell, FiUser, FiThermometer } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectSearchQuery, setSearchQuery } from '../../store/taskSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value))
  }

  return (
    <header className="hidden border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md md:block md:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        {/* Left: title */}
        <div className="flex items-center md:w-auto">
          <h1 className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
            My Task
          </h1>
        </div>

        {/* Center: search / command bar */}
        <div className="w-full md:flex-1">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 shadow-sm">
            <FiSearch className="mr-2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="flex-1 bg-transparent text-[11px] md:text-xs text-slate-800 outline-none placeholder:text-slate-400"
            />
            <span className="hidden items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] text-slate-500 md:inline-flex">
              <span className="rounded border border-slate-300 px-1">⌘</span>
              <span className="rounded border border-slate-300 px-1">K</span>
            </span>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center justify-end gap-3 md:w-auto">
          <button className="hidden items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-600 md:inline-flex">
            <FiThermometer className="h-4 w-4 text-slate-400" />
            <span>32°F</span>
          </button>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white">
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
            <FiBell className="h-4 w-4 text-slate-500" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300">
              <FiUser className="h-4 w-4 text-slate-700" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


