/**
 * EXPLORATION C: "Paper Journal"
 * 
 * Visual Treatment: Warm paper/parchment tones with terracotta accent
 * Information Architecture: Full-page sections with dot navigation
 * Layout: Journal-style - each view is a "spread" that you navigate between
 * 
 * Key Design Decisions:
 * - Paper-like textures and colors feel tactile and personal
 * - Terracotta accent is warm without being aggressive
 * - Dot navigation mimics page dots in physical journals
 * - Large, generous typography for readability
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
  { id: 1, name: 'Medication', emoji: '💊' },
  { id: 2, name: 'Exercise', emoji: '🏃' },
  { id: 3, name: 'Reading', emoji: '📖' },
  { id: 4, name: 'Water', emoji: '💧' },
  { id: 5, name: 'Sleep 7h+', emoji: '😴' },
  { id: 6, name: 'Planning', emoji: '📝' },
]

const pages = ['planner', 'tasks', 'timer', 'cycles', 'reflect']

export default function ExplorationC() {
  const [currentPage, setCurrentPage] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60)
  const [completedDays, setCompletedDays] = useState<Record<number, number[]>>({
    1: [1,2,3,5,6,7,9,10,12,13,14,15,17],
    2: [1,3,5,7,9,11,13,15,17],
    3: [2,4,6,8,10,12,14,16],
    4: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    5: [1,2,4,5,7,8,10,11,13,14,16,17],
    6: [1,8,15],
  })

  const cycleDay = 17

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7f3ee',
      fontFamily: "'Crimson Pro', Georgia, serif",
      color: '#4a423a',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Paper texture overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        opacity: 0.03,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderBottom: '1px solid #e5ddd3',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 400,
          color: '#2a2420',
          margin: 0,
          letterSpacing: '2px',
          textTransform: 'lowercase',
        }}>
          tempo
        </h1>
        
        <div style={{
          fontSize: '14px',
          color: '#8a8078',
          fontFamily: "'Inter', sans-serif",
        }}>
          Wednesday, April 23
        </div>
      </header>

      {/* Page Content */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '48px',
        minHeight: 'calc(100vh - 160px)',
      }}>
        {/* Planner Page */}
        {currentPage === 0 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              marginBottom: '48px',
            }}>
              <h2 style={{
                fontSize: '48px',
                fontWeight: 300,
                color: '#2a2420',
                margin: 0,
                letterSpacing: '-1px',
              }}>
                Today
              </h2>
              <span style={{
                fontSize: '18px',
                color: '#b07a5a',
                fontStyle: 'italic',
              }}>
                cycle day {cycleDay}
              </span>
            </div>

            {/* Two Column Layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
            }}>
              {/* Timeline Column */}
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#8a8078',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Schedule
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '20px',
                        padding: block.highlight ? '16px 20px' : '8px 0',
                        backgroundColor: block.highlight ? '#f0e9df' : 'transparent',
                        borderRadius: block.highlight ? '8px' : '0',
                        borderLeft: block.highlight ? '3px solid #b07a5a' : 'none',
                      }}
                    >
                      <span style={{
                        width: '50px',
                        fontSize: '14px',
                        color: '#a09890',
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {block.time}
                      </span>
                      <div>
                        <div style={{
                          fontSize: '18px',
                          color: block.highlight ? '#2a2420' : '#5a524a',
                          fontWeight: block.highlight ? 500 : 400,
                        }}>
                          {block.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#a09890',
                          fontFamily: "'Inter', sans-serif",
                          marginTop: '2px',
                        }}>
                          {block.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks Column */}
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#8a8078',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Tasks
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {mockTasks.map(task => (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 0',
                        borderBottom: '1px solid #e5ddd3',
                        opacity: task.done ? 0.5 : 1,
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: `2px solid ${task.done ? '#b07a5a' : '#c5b8a8'}`,
                        backgroundColor: task.done ? '#b07a5a' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}>
                        {task.done && '✓'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '17px',
                          color: '#2a2420',
                          textDecoration: task.done ? 'line-through' : 'none',
                        }}>
                          {task.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#a09890',
                          marginTop: '4px',
                          fontFamily: "'Inter', sans-serif",
                        }}>
                          {task.project} · {task.estimate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button style={{
                  marginTop: '20px',
                  padding: '12px 20px',
                  border: '1px dashed #c5b8a8',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#8a8078',
                  fontSize: '15px',
                  cursor: 'pointer',
                  width: '100%',
                  fontFamily: 'inherit',
                }}>
                  + add task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timer Page */}
        {currentPage === 2 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            animation: 'fadeIn 0.3s ease',
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#8a8078',
              margin: '0 0 48px 0',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}>
              Focus Session
            </h2>

            {/* Timer Display */}
            <div style={{
              fontSize: '120px',
              fontWeight: 300,
              color: timerActive ? '#b07a5a' : '#2a2420',
              letterSpacing: '-4px',
              fontFamily: "'Crimson Pro', Georgia, serif",
              transition: 'color 0.3s ease',
            }}>
              {formatTime(timerSeconds)}
            </div>

            {/* Timer Controls */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '48px',
            }}>
              <button
                onClick={() => setTimerActive(!timerActive)}
                style={{
                  padding: '16px 48px',
                  border: 'none',
                  borderRadius: '40px',
                  backgroundColor: timerActive ? '#2a2420' : '#b07a5a',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '1px',
                }}
              >
                {timerActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => setTimerSeconds(25 * 60)}
                style={{
                  padding: '16px 32px',
                  border: '1px solid #c5b8a8',
                  borderRadius: '40px',
                  backgroundColor: 'transparent',
                  color: '#5a524a',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Reset
              </button>
            </div>

            {/* Preset Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
            }}>
              {[15, 25, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setTimerSeconds(mins * 60)}
                  style={{
                    padding: '8px 16px',
                    border: timerSeconds === mins * 60 ? '1px solid #b07a5a' : '1px solid #e5ddd3',
                    borderRadius: '20px',
                    backgroundColor: timerSeconds === mins * 60 ? '#f0e9df' : 'transparent',
                    color: '#5a524a',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {mins}m
                </button>
              ))}
            </div>

            {/* Current Task */}
            <div style={{
              marginTop: '64px',
              padding: '20px 32px',
              backgroundColor: '#f0e9df',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '13px',
                color: '#a09890',
                marginBottom: '8px',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Working on
              </div>
              <div style={{
                fontSize: '18px',
                color: '#2a2420',
              }}>
                Deep work block · Building
              </div>
            </div>
          </div>
        )}

        {/* Cycles Page */}
        {currentPage === 3 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '48px',
            }}>
              <h2 style={{
                fontSize: '48px',
                fontWeight: 300,
                color: '#2a2420',
                margin: 0,
              }}>
                Cycle 4
              </h2>
              <span style={{
                fontSize: '16px',
                color: '#8a8078',
              }}>
                Day {cycleDay} of 28
              </span>
            </div>

            {/* Habit Grid */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #e5ddd3',
            }}>
              {/* Day Numbers Header */}
              <div style={{
                display: 'flex',
                marginBottom: '24px',
                paddingLeft: '100px',
              }}>
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '24px',
                      textAlign: 'center',
                      fontSize: '11px',
                      color: i + 1 === cycleDay ? '#b07a5a' : '#a09890',
                      fontWeight: i + 1 === cycleDay ? 600 : 400,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Habit Rows */}
              {mockHabits.map(habit => (
                <div
                  key={habit.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{
                    width: '100px',
                    fontSize: '14px',
                    color: '#5a524a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '16px' }}>{habit.emoji}</span>
                    {habit.name}
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
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
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: isToday ? '2px solid #b07a5a' : 'none',
                            backgroundColor: 
                              isFuture ? '#f0ece7' :
                              isCompleted ? '#b07a5a' : '#e5ddd3',
                            cursor: isFuture ? 'default' : 'pointer',
                            transition: 'all 0.15s ease',
                            padding: 0,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Cycle Summary */}
            <div style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}>
              <div style={{
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5ddd3',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 300,
                  color: '#2a2420',
                }}>
                  76%
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#a09890',
                  marginTop: '4px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  completion rate
                </div>
              </div>
              <div style={{
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5ddd3',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 300,
                  color: '#2a2420',
                }}>
                  5
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#a09890',
                  marginTop: '4px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  perfect days
                </div>
              </div>
              <div style={{
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5ddd3',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 300,
                  color: '#2a2420',
                }}>
                  11
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#a09890',
                  marginTop: '4px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  days remaining
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Page */}
        {currentPage === 1 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 300,
              color: '#2a2420',
              margin: '0 0 48px 0',
            }}>
              Projects
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}>
              {['Building', 'Study', 'Routines', 'Chores', 'Admin'].map(project => (
                <div
                  key={project}
                  style={{
                    padding: '24px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e5ddd3',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s ease',
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#2a2420',
                    margin: '0 0 16px 0',
                  }}>
                    {project}
                  </h3>
                  <div style={{
                    fontSize: '14px',
                    color: '#a09890',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {mockTasks.filter(t => t.project === project).length} tasks
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflect/Insights Page */}
        {currentPage === 4 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 300,
              color: '#2a2420',
              margin: '0 0 48px 0',
            }}>
              Reflect
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
            }}>
              {/* Time by Category */}
              <div style={{
                padding: '32px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e5ddd3',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#8a8078',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  This Week
                </h3>

                {[
                  { name: 'Building', hours: 12, color: '#b07a5a' },
                  { name: 'Study', hours: 8, color: '#7a9eb8' },
                  { name: 'Routines', hours: 14, color: '#9eb87a' },
                  { name: 'Chores', hours: 5, color: '#b8a07a' },
                ].map(cat => (
                  <div key={cat.name} style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '15px', color: '#5a524a' }}>
                        {cat.name}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#a09890',
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {cat.hours}h
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      backgroundColor: '#f0ece7',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(cat.hours / 14) * 100}%`,
                        height: '100%',
                        backgroundColor: cat.color,
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly Summary */}
              <div style={{
                padding: '32px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e5ddd3',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#8a8078',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Summary
                </h3>

                <div style={{
                  fontSize: '64px',
                  fontWeight: 300,
                  color: '#2a2420',
                  marginBottom: '8px',
                }}>
                  39h
                </div>
                <div style={{
                  fontSize: '15px',
                  color: '#a09890',
                  marginBottom: '32px',
                }}>
                  total time tracked
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#f0e9df',
                  borderRadius: '8px',
                  fontSize: '15px',
                  color: '#5a524a',
                  lineHeight: 1.6,
                }}>
                  You spent more time on routines this week than usual. 
                  Building projects took 3 fewer hours than planned.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Page Navigation Dots */}
      <nav style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        {pages.map((page, i) => (
          <button
            key={page}
            onClick={() => setCurrentPage(i)}
            style={{
              width: currentPage === i ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentPage === i ? '#b07a5a' : '#d5ccc2',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
            title={page}
          />
        ))}
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
