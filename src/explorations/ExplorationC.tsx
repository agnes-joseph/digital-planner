/**
 * EXPLORATION C: "Paper Journal"
 * 
 * Visual Treatment: Warm parchment gradient with soft rose accents
 * Information Architecture: Journal-style full-page spreads
 * 
 * Key Design Decisions:
 * - Warmer gradient (dusty rose to cream) feels personal
 * - Dot navigation mimics physical journal pages
 * - Large serif typography for warmth
 * - Interactive habit grid as centerpiece
 * - Feels like a digital bullet journal
 */

import { useState } from 'react'

const mockTasks = [
  { id: 1, title: 'Review wireframes', project: 'Building', done: false, estimate: '45m' },
  { id: 2, title: 'Call dentist', project: 'Admin', done: true, estimate: '10m' },
  { id: 3, title: 'Chapter 6 notes', project: 'Study', done: false, estimate: '1h' },
  { id: 4, title: 'Laundry', project: 'Chores', done: false, estimate: '30m' },
  { id: 5, title: 'Evening walk', project: 'Routines', done: false, estimate: '30m' },
]

const mockHabits = [
  { id: 1, name: 'Medication' },
  { id: 2, name: 'Exercise' },
  { id: 3, name: 'Reading' },
  { id: 4, name: 'Water' },
  { id: 5, name: 'Sleep 7h+' },
  { id: 6, name: 'Planning' },
]

const pages = ['planner', 'tasks', 'timer', 'cycles', 'reflect']

export default function ExplorationC() {
  const [currentPage, setCurrentPage] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60)
  const [completedDays, setCompletedDays] = useState<Record<number, number[]>>({
    1: [1,2,3,5,6,7,9,10,12,13,14,15,17],
    2: [1,3,5,8,10,12,15,17],
    3: [2,4,6,9,11,13,16],
    4: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    5: [1,2,4,5,7,8,10,11,13,14,16,17],
    6: [1,8,15],
  })
  const [tasks, setTasks] = useState(mockTasks)

  const cycleDay = 17

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const renderPlanner = () => (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-baseline gap-4 mb-12">
        <h2 className="text-5xl font-light text-white tracking-tight">
          Today
        </h2>
        <span className="text-lg text-white/60 italic">
          cycle day {cycleDay}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-16">
        {/* Timeline Column */}
        <div>
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-6">
            Schedule
          </h3>
          
          <div className="space-y-3">
            {[
              { time: '8:00', title: 'Morning routine', duration: '1h' },
              { time: '9:00', title: 'Deep work block', duration: '2h', highlight: true },
              { time: '11:00', title: 'Break', duration: '30m' },
              { time: '12:00', title: 'Lunch', duration: '1h' },
              { time: '14:00', title: 'Study session', duration: '1.5h' },
              { time: '16:00', title: 'Admin tasks', duration: '1h' },
              { time: '18:00', title: 'Evening routine', duration: '2h' },
            ].map((block, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 p-4 rounded-2xl transition-colors ${
                  block.highlight 
                    ? 'bg-white/15 backdrop-blur-xl border border-white/20' 
                    : 'hover:bg-white/5'
                }`}
              >
                <span className="text-white/40 text-sm w-12 pt-0.5">
                  {block.time}
                </span>
                <div className={`w-0.5 h-10 rounded-full ${block.highlight ? 'bg-rose-300/60' : 'bg-white/20'}`} />
                <div>
                  <p className={`text-lg ${block.highlight ? 'text-white font-medium' : 'text-white/70'}`}>
                    {block.title}
                  </p>
                  <p className="text-white/40 text-sm mt-0.5">
                    {block.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Column */}
        <div>
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-6">
            Tasks
          </h3>

          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-start gap-3 p-4 rounded-2xl transition-all cursor-pointer hover:bg-white/10 ${
                  task.done ? 'opacity-50' : ''
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                  task.done 
                    ? 'border-rose-300/60 bg-rose-300/60' 
                    : 'border-white/30 hover:border-white/50'
                }`}>
                  {task.done && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-white ${task.done ? 'line-through' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    {task.project} - {task.estimate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 p-4 rounded-2xl border border-dashed border-white/20 text-white/50 hover:bg-white/5 hover:border-white/30 transition-all">
            + add task
          </button>
        </div>
      </div>
    </div>
  )

  const renderTimer = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn">
      <p className="text-white/50 text-sm uppercase tracking-widest mb-12">
        Focus Session
      </p>

      <div className={`text-8xl font-light tracking-tight transition-colors ${
        timerActive ? 'text-rose-200' : 'text-white'
      }`}>
        {formatTime(timerSeconds)}
      </div>

      <div className="flex gap-4 mt-12">
        <button
          onClick={() => setTimerActive(!timerActive)}
          className={`px-12 py-4 rounded-full text-lg font-medium transition-all ${
            timerActive 
              ? 'bg-white/20 text-white' 
              : 'bg-rose-300/30 text-white hover:bg-rose-300/40'
          }`}
        >
          {timerActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => setTimerSeconds(25 * 60)}
          className="px-8 py-4 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-all"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-3 mt-8">
        {[15, 25, 45, 60].map(mins => (
          <button
            key={mins}
            onClick={() => setTimerSeconds(mins * 60)}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              timerSeconds === mins * 60 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {mins}m
          </button>
        ))}
      </div>

      <div className="mt-16 px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Working on</p>
        <p className="text-white text-lg">Deep work block - Building</p>
      </div>
    </div>
  )

  const renderCycles = () => (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-5xl font-light text-white tracking-tight">
          Cycle 4
        </h2>
        <span className="text-white/50">
          Day {cycleDay} of 28
        </span>
      </div>

      {/* Habit Grid */}
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8">
        {/* Day Numbers Header */}
        <div className="flex mb-6 pl-28">
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className={`w-6 text-center text-xs ${
                i + 1 === cycleDay ? 'text-rose-300 font-semibold' : 'text-white/40'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Habit Rows */}
        {mockHabits.map(habit => (
          <div key={habit.id} className="flex items-center mb-4 last:mb-0">
            <span className="w-28 text-white/70 text-sm flex-shrink-0">
              {habit.name}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 28 }, (_, i) => {
                const isCompleted = completedDays[habit.id]?.includes(i + 1)
                const isFuture = i + 1 > cycleDay
                const isToday = i + 1 === cycleDay
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isFuture) {
                        setCompletedDays(prev => {
                          const current = prev[habit.id] || []
                          if (isCompleted) {
                            return { ...prev, [habit.id]: current.filter(d => d !== i + 1) }
                          } else {
                            return { ...prev, [habit.id]: [...current, i + 1] }
                          }
                        })
                      }
                    }}
                    className={`w-5 h-5 rounded transition-all ${
                      isToday ? 'ring-2 ring-rose-300/60' : ''
                    } ${
                      isFuture 
                        ? 'bg-white/5 cursor-default' 
                        : isCompleted 
                          ? 'bg-rose-300/60 hover:bg-rose-300/70' 
                          : 'bg-white/15 hover:bg-white/25 cursor-pointer'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cycle Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { label: 'Completion Rate', value: '76%' },
          { label: 'Current Streak', value: '12 days' },
          { label: 'Best Habit', value: 'Water' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-center">
            <p className="text-3xl font-light text-white mb-1">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Phase Info */}
      <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
        <h3 className="text-white font-medium mb-4">Luteal Phase Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/50 text-sm mb-1">Energy Level</p>
            <p className="text-white">Moderate - winding down</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/50 text-sm mb-1">Recommended Focus</p>
            <p className="text-white">Detail work, organization</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReflect = () => (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-5xl font-light text-white tracking-tight mb-12">
        Reflect
      </h2>

      <div className="space-y-6">
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <label className="text-white/50 text-sm block mb-3">How are you feeling today?</label>
          <div className="flex gap-3">
            {['Low', 'Okay', 'Good', 'Great'].map((mood, i) => (
              <button
                key={mood}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/15 hover:text-white transition-all"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <label className="text-white/50 text-sm block mb-3">One thing you&apos;re grateful for</label>
          <textarea 
            className="w-full bg-transparent text-white placeholder-white/30 resize-none outline-none text-lg"
            rows={3}
            placeholder="Write here..."
          />
        </div>

        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6">
          <label className="text-white/50 text-sm block mb-3">Notes for tomorrow</label>
          <textarea 
            className="w-full bg-transparent text-white placeholder-white/30 resize-none outline-none text-lg"
            rows={3}
            placeholder="Write here..."
          />
        </div>
      </div>
    </div>
  )

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #9B8A85 0%, #B5A69E 25%, #C9B9B0 50%, #D8CCC5 75%, #E5DDD8 100%)'
      }}
    >
      {/* Warm overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(180, 130, 120, 0.15) 0%, transparent 50%)'
        }}
      />

      {/* Header */}
      <header className="relative flex justify-between items-center px-12 py-6 border-b border-white/10">
        <h1 className="text-2xl font-light text-white tracking-widest lowercase">
          tempo
        </h1>
        
        <span className="text-white/50 text-sm">
          Wednesday, April 23
        </span>
      </header>

      {/* Page Content */}
      <main className="relative px-12 py-12">
        {currentPage === 0 && renderPlanner()}
        {currentPage === 1 && renderPlanner()}
        {currentPage === 2 && renderTimer()}
        {currentPage === 3 && renderCycles()}
        {currentPage === 4 && renderReflect()}
      </main>

      {/* Dot Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
          {pages.map((page, i) => (
            <button
              key={page}
              onClick={() => setCurrentPage(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === i 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              title={page}
            />
          ))}
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
