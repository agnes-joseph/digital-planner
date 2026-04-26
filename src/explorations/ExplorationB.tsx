/**
 * EXPLORATION B: "Quiet Focus"
 * 
 * Visual Treatment: Cool gray/blue-gray base with soft blue accent
 * Information Architecture: Vertical sidebar navigation with dashboard-style home
 * Layout: Dashboard approach - shows summary cards for each area, drill-down into detail
 * 
 * Key Design Decisions:
 * - Cool neutral palette feels modern and focused
 * - Soft blue accent is calming without being clinical
 * - Icon-based sidebar keeps chrome minimal
 * - Home view shows at-a-glance summary of all areas
 * - Each section expands into full detail view
 */

import { useState } from 'react'

// Mock data
const mockProjects = [
  { id: 1, name: 'Building', taskCount: 5, color: '#7a9eb8' },
  { id: 2, name: 'Study', taskCount: 3, color: '#b89e7a' },
  { id: 3, name: 'Routines', taskCount: 8, color: '#9eb87a' },
  { id: 4, name: 'Chores', taskCount: 4, color: '#b87a9e' },
]

const mockCycleHabits = [
  { id: 1, name: 'Medication', completed: [1,2,3,4,5,8,9,10,11,12,15,16,17] },
  { id: 2, name: 'Exercise', completed: [1,3,5,8,10,12,15,17] },
  { id: 3, name: 'Reading', completed: [2,4,6,9,11,13,16] },
  { id: 4, name: 'Planning', completed: [1,8,15] },
]

const mockTimeData = {
  building: 12.5,
  study: 8,
  routines: 14,
  chores: 6,
}

export default function ExplorationB() {
  const [activeSection, setActiveSection] = useState('home')
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'stopwatch'>('pomodoro')
  const [timerRunning, setTimerRunning] = useState(false)
  const currentCycleDay = 17

  const navItems = [
    { id: 'home', icon: '◯', label: 'Home' },
    { id: 'projects', icon: '▢', label: 'Projects' },
    { id: 'calendar', icon: '▦', label: 'Calendar' },
    { id: 'timer', icon: '◷', label: 'Timer' },
    { id: 'cycles', icon: '◉', label: 'Cycles' },
    { id: 'insights', icon: '◐', label: 'Insights' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f6f8',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#4a4f5a',
      display: 'flex',
    }}>
      {/* Vertical Sidebar Navigation */}
      <nav style={{
        width: '72px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: '8px',
      }}>
        {/* Logo */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: '#6b8cae',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: '16px',
          marginBottom: '24px',
        }}>
          t
        </div>

        {/* Nav Items */}
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            title={item.label}
            style={{
              width: '44px',
              height: '44px',
              border: 'none',
              borderRadius: '12px',
              backgroundColor: activeSection === item.id ? '#eef2f7' : 'transparent',
              color: activeSection === item.id ? '#4a6fa5' : '#8a8f9a',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px 40px',
        overflow: 'auto',
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '32px',
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#2a2f3a',
              margin: 0,
              letterSpacing: '-0.5px',
            }}>
              Good morning
            </h1>
            <p style={{
              fontSize: '15px',
              color: '#7a7f8a',
              margin: '8px 0 0 0',
            }}>
              Wednesday, April 23 · Cycle Day {currentCycleDay}
            </p>
          </div>

          {/* Quick Timer Widget */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            backgroundColor: timerRunning ? '#4a6fa5' : '#fff',
            borderRadius: '16px',
            border: timerRunning ? 'none' : '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 600,
              fontFamily: 'monospace',
              color: timerRunning ? '#fff' : '#2a2f3a',
              letterSpacing: '1px',
            }}>
              25:00
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: timerRunning ? 'rgba(255,255,255,0.2)' : '#4a6fa5',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {timerRunning ? 'Pause' : 'Start'}
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}>
          {/* Today's Plan Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2a2f3a',
                margin: 0,
              }}>
                Today&apos;s Plan
              </h2>
              <button style={{
                padding: '6px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#6a6f7a',
                fontSize: '12px',
                cursor: 'pointer',
              }}>
                View Calendar
              </button>
            </div>

            {/* Mini Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { time: '9:00', title: 'Morning review', duration: '30m', category: 'routines' },
                { time: '10:00', title: 'Design exploration', duration: '2h', category: 'building' },
                { time: '12:00', title: 'Lunch', duration: '1h', category: 'personal' },
                { time: '14:00', title: 'Study session', duration: '1.5h', category: 'study' },
              ].map((block, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    backgroundColor: '#f8f9fb',
                    borderRadius: '12px',
                  }}
                >
                  <span style={{
                    fontSize: '13px',
                    color: '#8a8f9a',
                    fontFamily: 'monospace',
                    width: '48px',
                  }}>
                    {block.time}
                  </span>
                  <div style={{
                    width: '4px',
                    height: '32px',
                    backgroundColor: 
                      block.category === 'routines' ? '#9eb87a' :
                      block.category === 'building' ? '#7a9eb8' :
                      block.category === 'study' ? '#b89e7a' : '#b8b8b8',
                    borderRadius: '2px',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#2a2f3a',
                    }}>
                      {block.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#8a8f9a',
                    }}>
                      {block.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Overview Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2a2f3a',
                margin: 0,
              }}>
                Projects
              </h2>
              <button style={{
                padding: '6px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#6a6f7a',
                fontSize: '12px',
                cursor: 'pointer',
              }}>
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockProjects.map(project => (
                <div
                  key={project.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f8f9fb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '4px',
                    backgroundColor: project.color,
                  }} />
                  <span style={{
                    flex: 1,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2a2f3a',
                  }}>
                    {project.name}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#8a8f9a',
                  }}>
                    {project.taskCount} tasks
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cycle Tracker Mini Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2a2f3a',
                margin: 0,
              }}>
                Cycle Tracker
              </h2>
              <span style={{
                fontSize: '12px',
                color: '#8a8f9a',
                padding: '4px 10px',
                backgroundColor: '#f0f2f5',
                borderRadius: '6px',
              }}>
                Day {currentCycleDay} of 28
              </span>
            </div>

            {/* Mini Habit Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockCycleHabits.slice(0, 3).map(habit => (
                <div key={habit.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '80px',
                    fontSize: '13px',
                    color: '#5a5f6a',
                    flexShrink: 0,
                  }}>
                    {habit.name}
                  </span>
                  <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                    {Array.from({ length: 28 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '2px',
                          backgroundColor: 
                            i + 1 > currentCycleDay ? '#e5e7eb' :
                            habit.completed.includes(i + 1) ? '#6b8cae' : '#f0f2f5',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '10px',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              backgroundColor: 'transparent',
              color: '#6a6f7a',
              fontSize: '13px',
              cursor: 'pointer',
            }}>
              View Full Cycle
            </button>
          </div>

          {/* Time Insights Mini Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2a2f3a',
                margin: 0,
              }}>
                This Week
              </h2>
              <button style={{
                padding: '6px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#6a6f7a',
                fontSize: '12px',
                cursor: 'pointer',
              }}>
                Details
              </button>
            </div>

            {/* Simple Bar Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(mockTimeData).map(([category, hours]) => {
                const maxHours = Math.max(...Object.values(mockTimeData))
                const colors: Record<string, string> = {
                  building: '#7a9eb8',
                  study: '#b89e7a',
                  routines: '#9eb87a',
                  chores: '#b87a9e',
                }
                return (
                  <div key={category}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontSize: '13px',
                        color: '#5a5f6a',
                        textTransform: 'capitalize',
                      }}>
                        {category}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        color: '#8a8f9a',
                        fontFamily: 'monospace',
                      }}>
                        {hours}h
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      backgroundColor: '#f0f2f5',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(hours / maxHours) * 100}%`,
                        height: '100%',
                        backgroundColor: colors[category],
                        borderRadius: '4px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: '#f8f9fb',
              borderRadius: '10px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#2a2f3a' }}>
                40.5
              </span>
              <span style={{ fontSize: '14px', color: '#8a8f9a', marginLeft: '4px' }}>
                hours tracked
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
