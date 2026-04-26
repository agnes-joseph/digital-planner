/**
 * EXPLORATION D: "Still Water"
 *
 * Visual Treatment: Full-bleed atmospheric background, glassmorphism UI, TIDE-inspired
 * Information Architecture: Bottom pill navigation (mobile-first), "Now for you" quick actions
 * Layout: Immersive — content floats over a serene background image/gradient
 *
 * Key Design Decisions:
 * - Full-screen atmospheric background (dusk gradient mimicking TIDE's ocean photo)
 * - All UI elements are frosted glass (backdrop-blur + semi-transparent white/black)
 * - Bold large greeting top-left, week strip below it
 * - Horizontally scrollable "Now for you" action cards mid-screen
 * - Pill-shaped bottom tab bar with icon + label, active state fills lighter
 * - Fully responsive: adapts from 375px mobile to wide desktop
 */

import { useState } from 'react'

type TabId = 'home' | 'planner' | 'timer' | 'cycles' | 'insights'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const TODAY_INDEX = 3 // Wednesday

const QUICK_ACTIONS = [
  { id: 'focus', icon: '◎', label: 'Focus Timer', sub: '25 min' },
  { id: 'plan', icon: '▦', label: 'Daily Plan', sub: '3 tasks left' },
  { id: 'cycle', icon: '◉', label: 'Cycle Day', sub: 'Day 17 of 28' },
  { id: 'reflect', icon: '◈', label: 'Reflect', sub: 'Evening check-in' },
  { id: 'breathe', icon: '◌', label: 'Breathwork', sub: '4-7-8 method' },
]

const HABITS = [
  { id: 1, name: 'Medication', done: [1,2,3,4,5,8,9,10,11,12,15,16,17] },
  { id: 2, name: 'Movement',   done: [1,3,5,8,10,12,15,17] },
  { id: 3, name: 'Reading',    done: [2,4,6,9,11,13,16] },
  { id: 4, name: 'Water',      done: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17] },
  { id: 5, name: 'Sleep',      done: [1,2,4,5,7,8,10,11,13,14,16] },
]

const TASKS = [
  { id: 1, title: 'Review design specs', project: 'Building', done: false, mins: 45 },
  { id: 2, title: 'Call dentist',         project: 'Admin',    done: true,  mins: 10 },
  { id: 3, title: 'Chapter 6 notes',      project: 'Study',    done: false, mins: 60 },
  { id: 4, title: 'Evening walk',         project: 'Routines', done: false, mins: 30 },
  { id: 5, title: 'Grocery run',          project: 'Chores',   done: false, mins: 45 },
]

const SCHEDULE = [
  { time: '9:00',  label: 'Morning review',    dur: '30m' },
  { time: '10:00', label: 'Deep work block',   dur: '2h', highlight: true },
  { time: '12:00', label: 'Lunch',             dur: '1h' },
  { time: '14:00', label: 'Study session',     dur: '1.5h' },
  { time: '16:30', label: 'Admin tasks',       dur: '1h' },
  { time: '18:00', label: 'Evening routine',   dur: '2h' },
]

// Frosted glass utility style
const glass = (opacity = 0.12, border = 0.18): React.CSSProperties => ({
  backgroundColor: `rgba(255,255,255,${opacity})`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid rgba(255,255,255,${border})`,
})

const glassDark = (opacity = 0.25): React.CSSProperties => ({
  backgroundColor: `rgba(20,18,30,${opacity})`,
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.10)',
})

export default function ExplorationD() {
  const [tab, setTab] = useState<TabId>('home')
  const [timerSecs, setTimerSecs] = useState(25 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(25)
  const [tasks, setTasks] = useState(TASKS)
  const [habits, setHabits] = useState(HABITS)
  const cycleDay = 17

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const toggleTask = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const toggleHabit = (habitId: number, day: number) => {
    if (day > cycleDay) return
    setHabits(prev => prev.map(h =>
      h.id !== habitId ? h :
      { ...h, done: h.done.includes(day) ? h.done.filter(d => d !== day) : [...h.done, day] }
    ))
  }

  const tabs: { id: TabId; icon: string; label: string }[] = [
    { id: 'home',     icon: '⊞', label: 'Home' },
    { id: 'planner',  icon: '▦', label: 'Planner' },
    { id: 'timer',    icon: '◎', label: 'Timer' },
    { id: 'cycles',   icon: '◉', label: 'Cycles' },
    { id: 'insights', icon: '◐', label: 'Insights' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      position: 'relative',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden',
    }}>
      {/* ── Atmospheric Background ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(170deg, #4a5568 0%, #718096 15%, #b07d6e 45%, #c89f7a 60%, #8fa8b8 80%, #6b7f8f 100%)',
        zIndex: 0,
      }} />
      {/* Subtle overlay for depth */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(60,55,80,0.25) 0%, rgba(0,0,0,0.05) 50%, rgba(20,18,30,0.55) 100%)',
        zIndex: 1,
      }} />

      {/* ── Scrollable Page Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '100px', // space for bottom nav
      }}>

        {/* ── Top Bar ── */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: 'clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px) 0',
        }}>
          {/* Greeting + week strip */}
          <div>
            <h1 style={{
              fontSize: 'clamp(36px, 8vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 6px 0',
              letterSpacing: '-1px',
              lineHeight: 1.05,
            }}>
              Good Day
            </h1>
            <div style={{
              display: 'flex',
              gap: 'clamp(10px, 2.5vw, 18px)',
              marginTop: '8px',
            }}>
              {DAYS.map((d, i) => (
                <span key={i} style={{
                  fontSize: 'clamp(11px, 2vw, 14px)',
                  fontWeight: i === TODAY_INDEX ? 600 : 400,
                  color: i === TODAY_INDEX ? '#ffffff' : 'rgba(255,255,255,0.45)',
                  letterSpacing: '1px',
                }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Controls pill + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <div style={{
              ...glass(0.15, 0.22),
              borderRadius: '40px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>🔕</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>⊞</span>
            </div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f4a46a, #8ab4c8, #c97fa0)',
              border: '2px solid rgba(255,255,255,0.4)',
            }} />
          </div>
        </header>

        {/* ── Main Tab Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '32px' }}>

          {/* HOME */}
          {tab === 'home' && (
            <div>
              {/* Spacer for atmospheric feel */}
              <div style={{ height: 'clamp(60px, 18vw, 180px)' }} />

              {/* "Now for you" section */}
              <div style={{ padding: '0 clamp(20px, 5vw, 40px)' }}>
                <p style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '14px',
                  fontWeight: 400,
                  margin: '0 0 14px 0',
                  letterSpacing: '0.5px',
                }}>
                  ✦ Now for you
                </p>

                {/* Horizontal scroll cards */}
                <div style={{
                  display: 'flex',
                  gap: '14px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}>
                  {QUICK_ACTIONS.map(action => (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.id === 'focus') setTab('timer')
                        if (action.id === 'plan') setTab('planner')
                        if (action.id === 'cycle') setTab('cycles')
                      }}
                      style={{
                        ...glass(0.14, 0.20),
                        borderRadius: '20px',
                        padding: 'clamp(16px, 3vw, 24px)',
                        minWidth: 'clamp(130px, 35vw, 170px)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        flexShrink: 0,
                        transition: 'transform 0.15s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <div style={{
                        fontSize: '22px',
                        color: 'rgba(255,255,255,0.85)',
                        marginBottom: '12px',
                      }}>
                        {action.icon}
                      </div>
                      <div style={{
                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                        fontWeight: 500,
                        color: '#ffffff',
                        marginBottom: '4px',
                      }}>
                        {action.label}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                      }}>
                        {action.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Today at a glance */}
              <div style={{
                margin: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 40px) 0',
                ...glass(0.10, 0.15),
                borderRadius: '24px',
                padding: 'clamp(20px, 4vw, 32px)',
              }}>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  margin: '0 0 16px 0',
                }}>
                  Today
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {SCHEDULE.slice(0, 4).map((s, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}>
                      <span style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.45)',
                        fontVariantNumeric: 'tabular-nums',
                        width: '44px',
                        flexShrink: 0,
                      }}>
                        {s.time}
                      </span>
                      <div style={{
                        width: '3px',
                        height: '32px',
                        borderRadius: '2px',
                        backgroundColor: s.highlight
                          ? 'rgba(255,200,140,0.8)'
                          : 'rgba(255,255,255,0.2)',
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 'clamp(13px, 2.5vw, 15px)',
                          fontWeight: s.highlight ? 600 : 400,
                          color: s.highlight ? '#ffffff' : 'rgba(255,255,255,0.75)',
                        }}>
                          {s.label}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                          {s.dur}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PLANNER */}
          {tab === 'planner' && (
            <div style={{ padding: '0 clamp(20px, 5vw, 40px)' }}>
              <h2 style={{
                fontSize: 'clamp(28px, 6vw, 48px)',
                fontWeight: 600,
                color: '#ffffff',
                margin: '0 0 6px 0',
                letterSpacing: '-0.5px',
              }}>
                Wednesday
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 28px 0',
              }}>
                April 23 · Cycle day {cycleDay}
              </p>

              {/* Responsive 2-col on desktop, 1-col on mobile */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}>
                {/* Schedule */}
                <div style={{
                  ...glass(0.12, 0.18),
                  borderRadius: '24px',
                  padding: 'clamp(20px, 4vw, 28px)',
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '0 0 20px 0',
                  }}>
                    Schedule
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {SCHEDULE.map((s, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center',
                        padding: s.highlight ? '12px 14px' : '6px 0',
                        ...( s.highlight ? {
                          ...glass(0.15, 0.20),
                          borderRadius: '14px',
                          borderLeft: '3px solid rgba(255,200,140,0.7)',
                        } : {}),
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.45)',
                          width: '42px',
                          flexShrink: 0,
                          fontVariantNumeric: 'tabular-nums',
                        }}>
                          {s.time}
                        </span>
                        <div>
                          <div style={{
                            fontSize: 'clamp(13px, 2vw, 15px)',
                            color: s.highlight ? '#fff' : 'rgba(255,255,255,0.75)',
                            fontWeight: s.highlight ? 600 : 400,
                          }}>
                            {s.label}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>
                            {s.dur}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div style={{
                  ...glass(0.12, 0.18),
                  borderRadius: '24px',
                  padding: 'clamp(20px, 4vw, 28px)',
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '0 0 20px 0',
                  }}>
                    Tasks · {tasks.filter(t => !t.done).length} remaining
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          ...glass(task.done ? 0.06 : 0.12, 0.12),
                          borderRadius: '14px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          opacity: task.done ? 0.55 : 1,
                          transition: 'opacity 0.2s ease',
                          width: '100%',
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          border: `1.5px solid ${task.done ? 'rgba(255,200,140,0.8)' : 'rgba(255,255,255,0.35)'}`,
                          backgroundColor: task.done ? 'rgba(255,200,140,0.25)' : 'transparent',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'rgba(255,200,140,0.9)',
                          fontSize: '11px',
                          marginTop: '1px',
                        }}>
                          {task.done && '✓'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 'clamp(13px, 2vw, 14px)',
                            color: '#ffffff',
                            textDecoration: task.done ? 'line-through' : 'none',
                            fontWeight: 400,
                          }}>
                            {task.title}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>
                            {task.project} · {task.mins}m
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIMER */}
          {tab === 'timer' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 'clamp(40px, 10vw, 80px) clamp(20px, 5vw, 40px) 0',
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 40px 0',
              }}>
                Focus Session
              </p>

              {/* Large timer display inside glass ring */}
              <div style={{
                width: 'clamp(220px, 50vw, 280px)',
                height: 'clamp(220px, 50vw, 280px)',
                borderRadius: '50%',
                ...glass(0.10, 0.20),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                boxShadow: timerRunning
                  ? '0 0 60px rgba(255,200,140,0.2), inset 0 0 30px rgba(255,255,255,0.05)'
                  : 'inset 0 0 30px rgba(255,255,255,0.03)',
                transition: 'box-shadow 0.5s ease',
              }}>
                <span style={{
                  fontSize: 'clamp(44px, 10vw, 64px)',
                  fontWeight: 200,
                  color: '#ffffff',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-2px',
                }}>
                  {fmt(timerSecs)}
                </span>
              </div>

              {/* Preset selector */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '32px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {[15, 25, 45, 60].map(m => (
                  <button
                    key={m}
                    onClick={() => { setSelectedPreset(m); setTimerSecs(m * 60); setTimerRunning(false) }}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '40px',
                      ...( selectedPreset === m
                        ? { backgroundColor: 'rgba(255,200,140,0.25)', border: '1px solid rgba(255,200,140,0.55)' }
                        : glass(0.10, 0.18)
                      ),
                      color: selectedPreset === m ? 'rgba(255,220,170,1)' : 'rgba(255,255,255,0.65)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {m}m
                  </button>
                ))}
              </div>

              {/* Start / Pause / Reset */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <button
                  onClick={() => setTimerRunning(r => !r)}
                  style={{
                    padding: 'clamp(14px, 3vw, 18px) clamp(36px, 8vw, 60px)',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: timerRunning ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.92)',
                    color: timerRunning ? '#ffffff' : '#2a2420',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => { setTimerSecs(selectedPreset * 60); setTimerRunning(false) }}
                  style={{
                    padding: 'clamp(14px, 3vw, 18px) clamp(24px, 6vw, 36px)',
                    borderRadius: '50px',
                    ...glass(0.12, 0.18),
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Currently working on */}
              <div style={{
                marginTop: '48px',
                ...glass(0.10, 0.15),
                borderRadius: '20px',
                padding: '16px 28px',
                textAlign: 'center',
                width: '100%',
                maxWidth: '360px',
              }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                  Working on
                </p>
                <p style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', color: '#fff', margin: 0, fontWeight: 500 }}>
                  Deep work block · Building
                </p>
              </div>
            </div>
          )}

          {/* CYCLES */}
          {tab === 'cycles' && (
            <div style={{ padding: '0 clamp(16px, 4vw, 40px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <h2 style={{
                  fontSize: 'clamp(28px, 6vw, 48px)',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.5px',
                }}>
                  Cycle 4
                </h2>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                  Day {cycleDay} of 28
                </span>
              </div>

              <div style={{
                ...glass(0.10, 0.16),
                borderRadius: '24px',
                padding: 'clamp(16px, 4vw, 28px)',
                overflowX: 'auto',
              }}>
                {/* Day number header */}
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '16px',
                  paddingLeft: 'clamp(80px, 20vw, 110px)',
                  minWidth: 'max-content',
                }}>
                  {Array.from({ length: 28 }, (_, i) => (
                    <div key={i} style={{
                      width: 'clamp(16px, 3vw, 22px)',
                      textAlign: 'center',
                      fontSize: '10px',
                      color: i + 1 === cycleDay ? 'rgba(255,200,140,0.9)' : 'rgba(255,255,255,0.35)',
                      fontWeight: i + 1 === cycleDay ? 700 : 400,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Habit rows */}
                {habits.map(habit => (
                  <div key={habit.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                    minWidth: 'max-content',
                  }}>
                    <span style={{
                      width: 'clamp(80px, 20vw, 110px)',
                      fontSize: 'clamp(11px, 2vw, 13px)',
                      color: 'rgba(255,255,255,0.75)',
                      flexShrink: 0,
                    }}>
                      {habit.name}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {Array.from({ length: 28 }, (_, i) => {
                        const day = i + 1
                        const isFuture = day > cycleDay
                        const isToday = day === cycleDay
                        const isCompleted = habit.done.includes(day)
                        return (
                          <button
                            key={i}
                            onClick={() => toggleHabit(habit.id, day)}
                            style={{
                              width: 'clamp(16px, 3vw, 22px)',
                              height: 'clamp(16px, 3vw, 22px)',
                              borderRadius: '5px',
                              border: isToday ? '1.5px solid rgba(255,200,140,0.7)' : '1px solid rgba(255,255,255,0.08)',
                              backgroundColor: isFuture
                                ? 'rgba(255,255,255,0.05)'
                                : isCompleted
                                  ? 'rgba(255,200,140,0.45)'
                                  : 'rgba(255,255,255,0.08)',
                              cursor: isFuture ? 'default' : 'pointer',
                              padding: 0,
                              transition: 'background-color 0.15s ease',
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary stats */}
              <div style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '14px',
              }}>
                {[
                  { label: 'Completion', value: '74%' },
                  { label: 'Best streak', value: '11 days' },
                  { label: 'Days left', value: `${28 - cycleDay}` },
                ].map(stat => (
                  <div key={stat.label} style={{
                    ...glass(0.10, 0.15),
                    borderRadius: '18px',
                    padding: 'clamp(16px, 3vw, 22px)',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: 'clamp(24px, 5vw, 32px)',
                      fontWeight: 300,
                      color: '#ffffff',
                      letterSpacing: '-1px',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.45)',
                      marginTop: '4px',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSIGHTS */}
          {tab === 'insights' && (
            <div style={{ padding: '0 clamp(20px, 5vw, 40px)' }}>
              <h2 style={{
                fontSize: 'clamp(28px, 6vw, 48px)',
                fontWeight: 600,
                color: '#ffffff',
                margin: '0 0 6px 0',
                letterSpacing: '-0.5px',
              }}>
                This Week
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 28px 0' }}>
                April 21 – 27, 2026
              </p>

              {/* Time bars */}
              <div style={{
                ...glass(0.10, 0.16),
                borderRadius: '24px',
                padding: 'clamp(20px, 4vw, 32px)',
                marginBottom: '20px',
              }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  margin: '0 0 24px 0',
                }}>
                  Time by area
                </p>
                {[
                  { label: 'Routines', hours: 14, color: 'rgba(160,200,160,0.7)' },
                  { label: 'Building', hours: 12.5, color: 'rgba(140,175,210,0.7)' },
                  { label: 'Study',    hours: 8,  color: 'rgba(210,185,140,0.7)' },
                  { label: 'Chores',   hours: 6,  color: 'rgba(195,155,190,0.7)' },
                ].map(area => (
                  <div key={area.label} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{area.label}</span>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontVariantNumeric: 'tabular-nums' }}>
                        {area.hours}h
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(area.hours / 14) * 100}%`,
                        height: '100%',
                        backgroundColor: area.color,
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.10)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Total tracked</span>
                  <span style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 600, color: '#ffffff' }}>
                    40.5h
                  </span>
                </div>
              </div>

              {/* Energy note */}
              <div style={{
                ...glass(0.10, 0.15),
                borderRadius: '20px',
                padding: 'clamp(16px, 4vw, 24px)',
              }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  margin: '0 0 12px 0',
                }}>
                  Weekly reflection
                </p>
                <p style={{
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.65,
                  margin: 0,
                  fontStyle: 'italic',
                }}>
                  You showed up most consistently for routines this week. Deep work blocks are gaining momentum.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* ── Bottom Pill Navigation ── */}
        <nav style={{
          position: 'fixed',
          bottom: 'clamp(16px, 4vw, 28px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          ...glassDark(0.35),
          borderRadius: '50px',
          padding: '8px 12px',
          display: 'flex',
          gap: '4px',
          minWidth: 'clamp(280px, 80vw, 360px)',
          justifyContent: 'space-between',
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '10px clamp(10px, 3vw, 18px)',
                borderRadius: '40px',
                border: 'none',
                backgroundColor: tab === t.id ? 'rgba(255,255,255,0.18)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                flex: 1,
              }}
            >
              <span style={{
                fontSize: '16px',
                color: tab === t.id ? '#ffffff' : 'rgba(255,255,255,0.5)',
              }}>
                {t.icon}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? '#ffffff' : 'rgba(255,255,255,0.45)',
                letterSpacing: '0.3px',
              }}>
                {t.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
