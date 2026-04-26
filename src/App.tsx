import { useState } from 'react'
import ExplorationA from './explorations/ExplorationA'
import ExplorationB from './explorations/ExplorationB'
import ExplorationC from './explorations/ExplorationC'

const explorations = [
  {
    id: 'a',
    name: 'Soft Canvas',
    description: 'Calendar-first approach with warm cream tones and sage green accent. Horizontal tab navigation with weekly calendar as the hero view.',
    palette: ['#faf8f5', '#7a9a7a', '#e8e4df', '#2d2a26'],
  },
  {
    id: 'b',
    name: 'Quiet Focus',
    description: 'Dashboard-style home with cool gray-blue palette. Vertical sidebar navigation showing at-a-glance summaries of all areas.',
    palette: ['#f5f6f8', '#6b8cae', '#e5e7eb', '#2a2f3a'],
  },
  {
    id: 'c',
    name: 'Paper Journal',
    description: 'Journal-style spreads with warm parchment tones and terracotta accent. Full-page sections with dot navigation mimicking a bullet journal.',
    palette: ['#f7f3ee', '#b07a5a', '#e5ddd3', '#2a2420'],
  },
]

export default function App() {
  const [activeExploration, setActiveExploration] = useState<string | null>(null)

  if (activeExploration === 'a') {
    return (
      <div>
        <button
          onClick={() => setActiveExploration(null)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          ← Back to Overview
        </button>
        <ExplorationA />
      </div>
    )
  }

  if (activeExploration === 'b') {
    return (
      <div>
        <button
          onClick={() => setActiveExploration(null)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          ← Back to Overview
        </button>
        <ExplorationB />
      </div>
    )
  }

  if (activeExploration === 'c') {
    return (
      <div>
        <button
          onClick={() => setActiveExploration(null)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          ← Back to Overview
        </button>
        <ExplorationC />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '48px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 500,
            color: '#1a1a1a',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px',
          }}>
            tempo
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#666',
            margin: 0,
            lineHeight: 1.5,
          }}>
            A calm, visual productivity app for neurodivergent users.
            <br />
            Three design explorations for review.
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
        }}>
          {explorations.map(exp => (
            <div
              key={exp.id}
              onClick={() => setActiveExploration(exp.id)}
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e5e5e5',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              {/* Color Preview */}
              <div style={{
                height: '160px',
                backgroundColor: exp.palette[0],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '24px',
              }}>
                {exp.palette.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: color,
                      border: color === '#fff' || color === '#fafafa' || color.startsWith('#f') 
                        ? '1px solid #e0e0e0' 
                        : 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    Exploration {exp.id.toUpperCase()}
                  </span>
                </div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  margin: '0 0 12px 0',
                }}>
                  {exp.name}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {exp.description}
                </p>

                <button style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: exp.palette[1],
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: '100%',
                }}>
                  View Exploration
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Problem Statement Summary */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e5e5e5',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            margin: '0 0 16px 0',
          }}>
            Design Brief
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            <div>
              <h4 style={{ fontSize: '16px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                Core Navigation
              </h4>
              <ul style={{
                margin: 0,
                padding: '0 0 0 20px',
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.8,
              }}>
                <li>Projects (task management)</li>
                <li>Calendar (time blocking)</li>
                <li>Timer (pomodoro/stopwatch)</li>
                <li>Cycle Tracker (28-day habits)</li>
                <li>Insights (time allocation)</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                Design Principles
              </h4>
              <ul style={{
                margin: 0,
                padding: '0 0 0 20px',
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.8,
              }}>
                <li>Low visual noise</li>
                <li>Strong spacing and hierarchy</li>
                <li>Soft, calming colors</li>
                <li>No gamification or streaks</li>
                <li>Emotionally safe and non-judgmental</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                Target Users
              </h4>
              <ul style={{
                margin: 0,
                padding: '0 0 0 20px',
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.8,
              }}>
                <li>Neurodivergent users</li>
                <li>ADHD and overstimulated users</li>
                <li>People overwhelmed by cluttered to-do lists</li>
                <li>Visual planners who want digital tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
