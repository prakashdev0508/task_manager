import Header from './components/layout/Header'
import Dashboard from './components/dashboard/Dashboard'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-slate-50">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App