/**
 * EXPLORATION A: "Soft Horizon"
 * 
 * Visual Treatment: Serene gradient background (mauve/dusty rose to soft gray)
 * with glassmorphism UI elements inspired by TIDE app
 * Information Architecture: Calendar-first with floating glass panels
 * 
 * Key Design Decisions:
 * - Full-bleed gradient background creates calm atmosphere
 * - Frosted glass panels with subtle borders
 * - Large, confident typography in white
 * - Pill-shaped navigation at bottom
 * - Quick actions as horizontal scrolling cards
 */

import { useState } from 'react'

const mockTasks = [
  { id: 1, title: 'Morning review', time: '9:00 AM', energy: 'low', project: 'Routines' },
  { id: 2, title: 'Deep work block', time: '10:00 AM', energy: 'high', project: 'Building' },
  { id: 3, title: 'Team sync', time: '2:00 PM', energy: 'medium', project: 'Work' },
  { id: 4, title: 'Study session', time: '4:00 PM', energy: 'medium', project: 'Study' },
]

const mockTimeBlocks = [
  { id: 1, title: 'Morning meditation', start: 8, duration: 0.5 },
  { id: 2, title: 'Review design specs', start: 9, duration: 1.5 },
  { id: 3, title: 'Lunch break', start: 12, duration: 1 },
  { id: 4, title: 'Read chapter 5', start: 14, duration: 1 },
]

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function ExplorationA() {
  const [activeView, setActiveView] = useState<'home' | 'planner' | 'tasks' | 'timer' | 'cycle'>('home')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [selectedDay] = useState(new Date().getDay())

  const cycleDay = 14
  const cycleDays = Array.from({ length: 28 }, (_, i) => i + 1)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const quickActions = [
    { icon: 'focus', label: 'Focus Timer', sublabel: '25 min' },
    { icon: 'plan', label: 'Plan Day', sublabel: '3 tasks' },
    { icon: 'breathe', label: 'Breathwork', sublabel: '4-7-8' },
  ]

  const renderHome = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-light text-white tracking-tight">
              {getGreeting()}
            </h1>
            <div className="flex gap-3 mt-3">
              {weekDays.map((day, i) => (
                <span
                  key={i}
                  className={`text-sm font-medium ${
                    i === selectedDay ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div 
              className="w-12 h-12 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #98D4BB 0%, #F4A574 50%, #E88B8B 100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom content */}
      <div className="px-6 pb-8">
        {/* Now for you */}
        <p className="text-white/70 text-sm font-medium mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
          </svg>
          Now for you
        </p>
        
        {/* Quick action cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                if (action.icon === 'focus') setActiveView('timer')
                if (action.icon === 'plan') setActiveView('tasks')
              }}
              className="flex-shrink-0 w-36 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 flex flex-col justify-between text-left transition-all hover:bg-white/15 hover:scale-[1.02]"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                {action.icon === 'focus' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                  </svg>
                )}
                {action.icon === 'plan' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )}
                {action.icon === 'breathe' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </div>
              <span className="text-white text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Upcoming tasks card */}
        <div className="mt-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-sm">Up next</span>
            <button 
              onClick={() => setActiveView('tasks')}
              className="text-white/50 text-xs hover:text-white transition-colors"
            >
              See all
            </button>
          </div>
          <div className="space-y-3">
            {mockTasks.slice(0, 2).map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-white/70 text-xs">{task.time.split(':')[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{task.title}</p>
                  <p className="text-white/50 text-xs">{task.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  task.energy === 'high' ? 'bg-rose-400' :
                  task.energy === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlanner = () => (
    <div className="flex flex-col h-full px-6 pt-12">
      <h1 className="text-3xl font-light text-white mb-2">Weekly View</h1>
      <p className="text-white/50 text-sm mb-6">April 21 - 27, 2026</p>
      
      {/* Day selector */}
      <div className="flex gap-2 mb-4">
        {weekDays.map((day, i) => (
          <button
            key={i}
            className={`flex-1 py-3 rounded-2xl transition-all ${
              i === selectedDay 
                ? 'bg-white/20 backdrop-blur-xl' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <span className="text-white/50 text-xs block">{day}</span>
            <span className="text-white text-lg font-medium">{21 + i}</span>
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 flex-1 overflow-auto">
        <div className="space-y-2">
          {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'].map((time, i) => {
            const block = mockTimeBlocks.find(b => b.start === 9 + i)
            return (
              <div key={i} className="flex items-start gap-3 py-3 border-t border-white/10 first:border-t-0">
                <span className="text-white/40 text-xs w-12 pt-1">{time}</span>
                {block ? (
                  <div className="flex-1 h-14 rounded-xl bg-white/15 p-3 border border-white/10">
                    <p className="text-white text-sm font-medium">{block.title}</p>
                    <p className="text-white/50 text-xs">{block.duration * 60}min</p>
                  </div>
                ) : (
                  <div className="flex-1 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="flex flex-col h-full px-6 pt-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-light text-white">Tasks</h1>
        <button className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-auto pb-8">
        {mockTasks.map((task) => (
          <div 
            key={task.id}
            className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 flex items-center gap-4"
          >
            <div className="w-6 h-6 rounded-full border-2 border-white/30 flex-shrink-0 hover:bg-white/20 transition-colors cursor-pointer" />
            <div className="flex-1">
              <p className="text-white font-medium">{task.title}</p>
              <p className="text-white/50 text-sm">{task.project} - {task.time}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${
              task.energy === 'high' ? 'bg-rose-500/20 text-rose-300' :
              task.energy === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {task.energy}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTimer = () => (
    <div className="flex flex-col h-full items-center justify-center px-6">
      <p className="text-white/50 text-sm uppercase tracking-widest mb-8">Focus Session</p>
      
      <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8">
        <div className="text-center">
          <span className="text-6xl font-light text-white tracking-tight">{timerMinutes}:00</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setTimerRunning(!timerRunning)}
          className={`px-8 py-4 rounded-full font-medium transition-all ${
            timerRunning 
              ? 'bg-white/30 text-white' 
              : 'bg-white/20 backdrop-blur-xl text-white hover:bg-white/30'
          }`}
        >
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button className="px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/70 hover:bg-white/15 transition-colors">
          Reset
        </button>
      </div>

      <div className="flex gap-3 mt-8">
        {[15, 25, 45].map((mins) => (
          <button
            key={mins}
            onClick={() => setTimerMinutes(mins)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              timerMinutes === mins 
                ? 'bg-white/20 text-white border border-white/20' 
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {mins} min
          </button>
        ))}
      </div>

      {/* Current task */}
      <div className="mt-12 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Working on</p>
        <p className="text-white font-medium">Deep work block</p>
      </div>
    </div>
  )

  const renderCycle = () => (
    <div className="flex flex-col h-full px-6 pt-12">
      <h1 className="text-3xl font-light text-white mb-2">28-Day Cycle</h1>
      <p className="text-white/50 mb-6">Day {cycleDay} - Ovulation Phase</p>

      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5">
        <div className="grid grid-cols-7 gap-2">
          {cycleDays.map((day) => (
            <button
              key={day}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-colors ${
                day === cycleDay 
                  ? 'bg-white/30 text-white font-medium ring-2 ring-white/50' 
                  : day < cycleDay 
                    ? 'bg-white/15 text-white/70' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5">
        <h3 className="text-white font-medium mb-4">Today&apos;s Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="text-white/80 text-sm">Peak energy expected</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-white/80 text-sm">Good for creative tasks</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-white/80 text-sm">Social energy is high</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div 
      className="h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #8B9CAB 0%, #B8A9A0 40%, #C4B5AB 70%, #D4C8C0 100%)'
      }}
    >
      {/* Subtle warm overlay at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(200, 170, 150, 0.3) 0%, transparent 60%)'
        }}
      />

      {/* Content */}
      <div className="relative h-full pb-24">
        {activeView === 'home' && renderHome()}
        {activeView === 'planner' && renderPlanner()}
        {activeView === 'tasks' && renderTasks()}
        {activeView === 'timer' && renderTimer()}
        {activeView === 'cycle' && renderCycle()}
      </div>

      {/* Bottom Navigation - Frosted Glass Pill */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="rounded-full bg-white/15 backdrop-blur-xl border border-white/20 p-2 flex items-center justify-around">
          {[
            { id: 'home', label: 'Home' },
            { id: 'planner', label: 'Plan' },
            { id: 'timer', label: 'Focus' },
            { id: 'cycle', label: 'Cycle' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as typeof activeView)}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-full transition-all ${
                activeView === item.id 
                  ? 'bg-white/20' 
                  : 'hover:bg-white/10'
              }`}
            >
              {item.id === 'home' && (
                <svg className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
              {item.id === 'planner' && (
                <svg className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              {item.id === 'timer' && (
                <svg className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                </svg>
              )}
              {item.id === 'cycle' && (
                <svg className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span className={`text-xs ${activeView === item.id ? 'text-white' : 'text-white/60'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
