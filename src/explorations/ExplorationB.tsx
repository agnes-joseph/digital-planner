/**
 * EXPLORATION B: "Quiet Focus"
 * 
 * Visual Treatment: Cool gray-blue gradient with glassmorphism
 * Information Architecture: Dashboard-style with summary cards
 * 
 * Key Design Decisions:
 * - Cooler, more muted gradient (steel blue to soft gray)
 * - Dashboard grid shows all areas at a glance
 * - Minimal icon-based vertical sidebar
 * - Cards drill down into detail views
 * - Professional yet calming aesthetic
 */

import { useState } from 'react'

const mockProjects = [
  { id: 1, name: 'Building', taskCount: 5, color: 'bg-sky-400/40' },
  { id: 2, name: 'Study', taskCount: 3, color: 'bg-amber-400/40' },
  { id: 3, name: 'Routines', taskCount: 8, color: 'bg-emerald-400/40' },
  { id: 4, name: 'Chores', taskCount: 4, color: 'bg-rose-400/40' },
]

const mockCycleHabits = [
  { id: 1, name: 'Medication', completed: [1,2,3,4,5,8,9,10,11,12,15,16,17] },
  { id: 2, name: 'Exercise', completed: [1,3,5,8,10,12,15,17] },
  { id: 3, name: 'Reading', completed: [2,4,6,9,11,13,16] },
]

const mockTimeData = {
  building: 12.5,
  study: 8,
  routines: 14,
  chores: 6,
}

export default function ExplorationB() {
  const [activeSection, setActiveSection] = useState('home')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)
  const currentCycleDay = 17

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'timer', label: 'Timer' },
    { id: 'cycles', label: 'Cycles' },
    { id: 'insights', label: 'Insights' },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const renderHome = () => (
    <div className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            {getGreeting()}
          </h1>
          <p className="text-white/50 text-sm">
            Wednesday, April 23 - Cycle Day {currentCycleDay}
          </p>
        </div>

        {/* Quick Timer Widget */}
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all ${
          timerRunning 
            ? 'bg-white/20 border-white/30' 
            : 'bg-white/10 border-white/20'
        }`}>
          <span className="text-2xl font-light text-white font-mono tracking-wider">
            {timerMinutes}:00
          </span>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              timerRunning 
                ? 'bg-white/20 text-white' 
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            {timerRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-5">
        {/* Today's Plan Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white font-medium">Today&apos;s Plan</h2>
            <button className="text-white/50 text-xs hover:text-white transition-colors">
              View Calendar
            </button>
          </div>

          <div className="space-y-3">
            {[
              { time: '9:00', title: 'Morning review', duration: '30m', color: 'bg-emerald-400/30' },
              { time: '10:00', title: 'Design exploration', duration: '2h', color: 'bg-sky-400/30' },
              { time: '12:00', title: 'Lunch', duration: '1h', color: 'bg-white/10' },
              { time: '14:00', title: 'Study session', duration: '1.5h', color: 'bg-amber-400/30' },
            ].map((block, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span className="text-white/40 text-xs font-mono w-12">
                  {block.time}
                </span>
                <div className={`w-1 h-8 rounded-full ${block.color}`} />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{block.title}</p>
                  <p className="text-white/40 text-xs">{block.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Overview Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white font-medium">Projects</h2>
            <button className="text-white/50 text-xs hover:text-white transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {mockProjects.map(project => (
              <div
                key={project.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className={`w-3 h-3 rounded ${project.color}`} />
                <span className="flex-1 text-white text-sm font-medium">
                  {project.name}
                </span>
                <span className="text-white/40 text-xs">
                  {project.taskCount} tasks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cycle Tracker Mini Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white font-medium">Cycle Tracker</h2>
            <span className="text-white/40 text-xs px-2 py-1 rounded-lg bg-white/10">
              Day {currentCycleDay} of 28
            </span>
          </div>

          <div className="space-y-3">
            {mockCycleHabits.map(habit => (
              <div key={habit.id} className="flex items-center gap-3">
                <span className="w-20 text-white/60 text-xs flex-shrink-0">
                  {habit.name}
                </span>
                <div className="flex gap-1 flex-1">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm transition-colors ${
                        i + 1 > currentCycleDay 
                          ? 'bg-white/10' 
                          : habit.completed.includes(i + 1) 
                            ? 'bg-sky-400/60' 
                            : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveSection('cycles')}
            className="w-full mt-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors"
          >
            View Full Cycle
          </button>
        </div>

        {/* Time Insights Mini Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white font-medium">This Week</h2>
            <button className="text-white/50 text-xs hover:text-white transition-colors">
              Details
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(mockTimeData).map(([category, hours]) => {
              const maxHours = Math.max(...Object.values(mockTimeData))
              const colors: Record<string, string> = {
                building: 'bg-sky-400/60',
                study: 'bg-amber-400/60',
                routines: 'bg-emerald-400/60',
                chores: 'bg-rose-400/60',
              }
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60 text-xs capitalize">{category}</span>
                    <span className="text-white/40 text-xs font-mono">{hours}h</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${colors[category]}`}
                      style={{ width: `${(hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-white/5 text-center">
            <span className="text-2xl font-light text-white">40.5</span>
            <span className="text-white/40 text-sm ml-1">hours tracked</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTimer = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <p className="text-white/50 text-sm uppercase tracking-widest mb-8">Focus Session</p>
      
      <div className="w-72 h-72 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-10">
        <span className="text-7xl font-light text-white tracking-tight">{timerMinutes}:00</span>
      </div>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setTimerRunning(!timerRunning)}
          className={`px-10 py-4 rounded-full font-medium text-lg transition-all ${
            timerRunning 
              ? 'bg-white/30 text-white' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/15 transition-colors">
          Reset
        </button>
      </div>

      <div className="flex gap-3">
        {[15, 25, 45, 60].map((mins) => (
          <button
            key={mins}
            onClick={() => setTimerMinutes(mins)}
            className={`px-5 py-2 rounded-full text-sm transition-colors ${
              timerMinutes === mins 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {mins}m
          </button>
        ))}
      </div>
    </div>
  )

  const renderCycles = () => (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-light text-white mb-2">28-Day Cycle</h1>
      <p className="text-white/50 mb-8">Day {currentCycleDay} - Luteal Phase</p>

      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 mb-6">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => (
            <button
              key={i}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-colors ${
                i + 1 === currentCycleDay 
                  ? 'bg-white/30 text-white font-medium ring-2 ring-white/50' 
                  : i + 1 < currentCycleDay 
                    ? 'bg-white/15 text-white/70' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completion Rate', value: '76%' },
          { label: 'Streak', value: '12 days' },
          { label: 'Best Habit', value: 'Exercise' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 text-center">
            <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
            <p className="text-white/50 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div 
      className="h-screen w-full flex overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6B7A8C 0%, #8895A5 30%, #A5AEB8 60%, #BFC6CE 100%)'
      }}
    >
      {/* Vertical Sidebar Navigation */}
      <nav className="w-20 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-semibold text-lg mb-8">
          t
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              title={item.label}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                activeSection === item.id 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/50 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {item.id === 'home' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
              {item.id === 'projects' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              )}
              {item.id === 'calendar' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              {item.id === 'timer' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                </svg>
              )}
              {item.id === 'cycles' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {item.id === 'insights' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Settings */}
        <button className="w-12 h-12 rounded-2xl text-white/40 hover:bg-white/10 hover:text-white/60 transition-all flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      {activeSection === 'home' && renderHome()}
      {activeSection === 'timer' && renderTimer()}
      {activeSection === 'cycles' && renderCycles()}
      {(activeSection === 'projects' || activeSection === 'calendar' || activeSection === 'insights') && renderHome()}
    </div>
  )
}
