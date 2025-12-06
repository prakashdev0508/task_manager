import {
  FiHome,
  FiCheckSquare,
  FiCoffee,
  FiFolder,
  FiFileText,
  FiMessageCircle,
} from 'react-icons/fi'

const menuItems = [
  { label: 'Dashboard', Icon: FiHome },
  { label: 'My Task', Icon: FiCheckSquare },
  { label: 'Meal Planner', Icon: FiCoffee },
  { label: 'Documents', Icon: FiFolder },
  { label: 'Receipts', Icon: FiFileText },
  { label: 'Chats', Icon: FiMessageCircle, badge: 3 },
]

const Sidebar = () => {
  return (
    <aside className="border-slate-200 bg-white/90 backdrop-blur-md md:w-52 md:border-r">
      {/* Desktop sidebar */}
      <div className="hidden h-full flex-col justify-between px-6 py-6 md:flex">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold tracking-tight">Sundays.</span>
          </div>

          <nav className="space-y-2 text-sm">
            {menuItems.map(({ label, Icon, badge }, idx) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition ${
                  idx === 1
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{label}</span>
                {badge && (
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-600">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2 text-[11px] text-slate-500">
          <button className="block w-full text-left text-slate-500 hover:text-slate-900">
            Settings
          </button>
          <button className="block w-full text-left text-slate-500 hover:text-slate-900">
            Help &amp; Support
          </button>
        </div>
      </div>

      {/* Mobile top nav */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Sundays.</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200">
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span className="h-4 w-4 rounded-full bg-slate-300" />
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200">
            <span className="space-y-1">
              <span className="block h-0.5 w-4 rounded-full bg-slate-900" />
              <span className="block h-0.5 w-3 rounded-full bg-slate-900" />
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


