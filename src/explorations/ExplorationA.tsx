/**
 * EXPLORATION A: "Soft Canvas"
 * 
 * Visual Treatment: Warm cream/sand base with sage green accent
 * Information Architecture: Horizontal tab navigation with prominent weekly calendar as hero
 * Layout: Calendar-first approach - time blocking is the primary view with task drawer
 * 
 * Key Design Decisions:
 * - Cream/warm white background reduces eye strain
 * - Sage green accent is calming and nature-inspired
 * - Large generous spacing throughout
 * - Tasks live in a collapsible right panel
 * - Timer is always accessible in top-right corner
 */

import { useState } from 'react'

// Mock data for demonstration
const mockTasks = [
  { id: 1, title: 'Review design specs', project: 'Building', estimate: '45m', scheduled: true },
  { id: 2, title: 'Morning meditation', project: 'Routines', estimate: '15m', scheduled: false },
  { id: 3, title: 'Grocery shopping', project: 'Chores', estimate: '1h', scheduled: false },
  { id: 4, title: 'Read chapter 5', project: 'Study', estimate: '30m', scheduled: true },
]

const mockTimeBlocks = [
  { id: 1, title: 'Morning meditation', start: 8, duration: 0.5, category: 'routines' },
  { id: 2, title: 'Review design specs', start: 9, duration: 1.5, category: 'building' },
  { id: 3, title: 'Lunch break', start: 12, duration: 1, category: 'personal' },
  { id: 4, title: 'Read chapter 5', start: 14, duration: 1, category: 'study' },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 12 }, (_, i) => i + 7) // 7am to 6pm

export default function ExplorationA() {
  const [activeTab, setActiveTab] = useState('calendar')
  const [selectedDay, setSelectedDay] = useState(2) // Wednesday
  const [taskPanelOpen, setTaskPanelOpen] = useState(true)
  const [timerActive, setTimerActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)

  const categoryColors: Record<string, string> = {
    routines: '#a8c5a8',
    building: '#c5b8a8',
    study: '#b8c5d0',
    personal: '#d0c5b8',
    chores: '#c5c5b8',
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#faf8f5',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#4a4540',
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px',
        borderBottom: '1px solid #e8e4df',
        backgroundColor: '#faf8f5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#2d2a26',
            margin: 0,
            letterSpacing: '-0.3px',
          }}>
            tempo
          </h1>
          
          {/* Horizontal Tab Navigation */}
          <nav style={{ display: 'flex', gap: '8px' }}>
            {['calendar', 'projects', 'timer', 'cycles', 'insights'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: activeTab === tab ? '#e8e4df' : 'transparent',
                  color: activeTab === tab ? '#2d2a26' : '#7a7570',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Timer Access */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 16px',
          backgroundColor: timerActive ? '#a8c5a8' : '#f0ece7',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 600,
            fontFamily: 'monospace',
            color: timerActive ? '#2d4a2d' : '#4a4540',
          }}>
            {String(timerMinutes).padStart(2, '0')}:00
          </span>
          <button
            onClick={() => setTimerActive(!timerActive)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: timerActive ? '#2d4a2d' : '#7a9a7a',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            {timerActive ? '■' : '▶'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        display: 'flex',
        height: 'calc(100vh - 81px)',
      }}>
        {/* Calendar View */}
        <div style={{
          flex: 1,
          padding: '24px 32px',
          overflow: 'auto',
        }}>
          {/* Week Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 500,
                color: '#2d2a26',
                margin: 0,
                letterSpacing: '-0.5px',
              }}>
                This Week
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#7a7570',
                margin: '4px 0 0 0',
              }}>
                April 21 - 27, 2026
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 16px',
                border: '1px solid #e8e4df',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#4a4540',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                ← Prev
              </button>
              <button style={{
                padding: '8px 16px',
                border: '1px solid #e8e4df',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#4a4540',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                Today
              </button>
              <button style={{
                padding: '8px 16px',
                border: '1px solid #e8e4df',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#4a4540',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                Next →
              </button>
            </div>
          </div>

          {/* Day Selector */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
          }}>
            {days.map((day, i) => (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                style={{
                  flex: 1,
                  padding: '16px 12px',
                  border: selectedDay === i ? '2px solid #7a9a7a' : '1px solid #e8e4df',
                  borderRadius: '12px',
                  backgroundColor: selectedDay === i ? '#f0f5f0' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  fontSize: '12px',
                  color: '#7a7570',
                  marginBottom: '4px',
                  fontWeight: 500,
                }}>
                  {day}
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: selectedDay === i ? '#2d4a2d' : '#2d2a26',
                }}>
                  {21 + i}
                </div>
              </button>
            ))}
          </div>

          {/* Time Grid */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            border: '1px solid #e8e4df',
            overflow: 'hidden',
          }}>
            {hours.map(hour => (
              <div
                key={hour}
                style={{
                  display: 'flex',
                  borderBottom: hour < 18 ? '1px solid #f0ece7' : 'none',
                  minHeight: '60px',
                }}
              >
                <div style={{
                  width: '64px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#9a9590',
                  textAlign: 'right',
                  borderRight: '1px solid #f0ece7',
                  flexShrink: 0,
                }}>
                  {hour > 12 ? `${hour - 12}pm` : hour === 12 ? '12pm' : `${hour}am`}
                </div>
                <div style={{
                  flex: 1,
                  padding: '4px 8px',
                  position: 'relative',
                }}>
                  {mockTimeBlocks
                    .filter(block => Math.floor(block.start) === hour)
                    .map(block => (
                      <div
                        key={block.id}
                        style={{
                          backgroundColor: categoryColors[block.category] || '#e8e4df',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          marginTop: `${(block.start % 1) * 60}px`,
                          height: `${block.duration * 60 - 8}px`,
                          cursor: 'pointer',
                          transition: 'transform 0.1s ease',
                        }}
                      >
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#2d2a26',
                        }}>
                          {block.title}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#5a5550',
                          marginTop: '2px',
                        }}>
                          {block.duration * 60}min
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Panel (Collapsible) */}
        {taskPanelOpen && (
          <aside style={{
            width: '320px',
            borderLeft: '1px solid #e8e4df',
            backgroundColor: '#fff',
            padding: '24px',
            overflow: 'auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#2d2a26',
                margin: 0,
              }}>
                Unscheduled Tasks
              </h3>
              <button
                onClick={() => setTaskPanelOpen(false)}
                style={{
                  padding: '4px 8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#7a7570',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ×
              </button>
            </div>

            <p style={{
              fontSize: '13px',
              color: '#9a9590',
              marginBottom: '20px',
            }}>
              Drag tasks to the calendar to schedule them
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockTasks.filter(t => !t.scheduled).map(task => (
                <div
                  key={task.id}
                  style={{
                    padding: '16px',
                    backgroundColor: '#faf8f5',
                    borderRadius: '12px',
                    cursor: 'grab',
                    transition: 'transform 0.1s ease',
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2d2a26',
                    marginBottom: '8px',
                  }}>
                    {task.title}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    fontSize: '12px',
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: '#e8e4df',
                      borderRadius: '4px',
                      color: '#5a5550',
                    }}>
                      {task.project}
                    </span>
                    <span style={{ color: '#9a9590' }}>
                      {task.estimate}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              border: '1px dashed #d0ccc7',
              borderRadius: '12px',
              backgroundColor: 'transparent',
              color: '#7a7570',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              + Add task
            </button>
          </aside>
        )}

        {/* Toggle Panel Button (when closed) */}
        {!taskPanelOpen && (
          <button
            onClick={() => setTaskPanelOpen(true)}
            style={{
              position: 'fixed',
              right: '24px',
              bottom: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#7a9a7a',
              color: '#fff',
              fontSize: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            ☰
          </button>
        )}
      </main>
    </div>
  )
}
