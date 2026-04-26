import { useState } from 'react'
import ExplorationA from './explorations/ExplorationA'
import ExplorationB from './explorations/ExplorationB'
import ExplorationC from './explorations/ExplorationC'
import ExplorationD from './explorations/ExplorationD'

const explorations = [
  {
    id: 'a',
    name: 'Soft Canvas',
    description: 'Calendar-first approach with warm cream tones and sage green accent. Horizontal tab navigation with weekly calendar as the hero view.',
    bg: 'linear-gradient(135deg, #faf8f5 0%, #e8e4df 100%)',
    accent: '#7a9a7a',
    tag: 'Calendar-first · Light & airy',
  },
  {
    id: 'b',
    name: 'Quiet Focus',
    description: 'Dashboard-style home with cool gray-blue palette. Vertical sidebar navigation showing at-a-glance summaries of all areas.',
    bg: 'linear-gradient(135deg, #f5f6f8 0%, #dde3ec 100%)',
    accent: '#6b8cae',
    tag: 'Dashboard · Sidebar nav',
  },
  {
    id: 'c',
    name: 'Paper Journal',
    description: 'Journal-style spreads with warm parchment tones and terracotta accent. Full-page sections with dot navigation mimicking a bullet journal.',
    bg: 'linear-gradient(135deg, #f7f3ee 0%, #e5ddd3 100%)',
    accent: '#b07a5a',
    tag: 'Journal spreads · Dot nav',
  },
  {
    id: 'd',
    name: 'Still Water',
    description: 'TIDE-inspired immersive experience. Full-bleed atmospheric background with glassmorphism UI, bold greeting, and a pill-shaped bottom tab bar.',
    bg: 'linear-gradient(135deg, #4a5568 0%, #b07d6e 45%, #8fa8b8 100%)',
    accent: 'rgba(255,200,140,0.85)',
    tag: 'Immersive · Glassmorphism',
  },
]

const components: Record<string, React.ComponentType> = {
  a: ExplorationA,
  b: ExplorationB,
  c: ExplorationC,
  d: ExplorationD,
}

const backButtonStyle = (dark: boolean): React.CSSProperties => ({
  position: 'fixed',
  top: '20px',
  left: '20px',
  zIndex: 1000,
  padding: '10px 20px',
  backgroundColor: dark ? 'rgba(255,255,255,0.15)' : '#fff',
  backdropFilter: dark ? 'blur(16px)' : 'none',
  border: dark ? '1px solid rgba(255,255,255,0.25)' : '1px solid #e0e0e0',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: 'system-ui, sans-serif',
  color: dark ? '#fff' : '#333',
  boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
})

export default function App() {
  const [activeExploration, setActiveExploration] = useState<string | null>(null)

  if (activeExploration && components[activeExploration]) {
    const Component = components[activeExploration]
    const isDark = activeExploration === 'd'
    return (
      <div>
        <button
          onClick={() => setActiveExploration(null)}
          style={backButtonStyle(isDark)}
        >
          ← Back
        </button>
        <Component />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7f7f5',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 'clamp(24px, 5vw, 64px) clamp(16px, 5vw, 48px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 500,
            color: '#1a1a1a',
            margin: '0 0 10px 0',
            letterSpacing: '-0.5px',
          }}>
            tempo
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: '#666',
            margin: 0,
            lineHeight: 1.5,
          }}>
            A calm productivity app for neurodivergent users. Four design explorations.
          </p>
        </header>

        {/* Exploration Cards — responsive grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(16px, 3vw, 28px)',
        }}>
          {explorations.map(exp => (
            <div
              key={exp.id}
              onClick={() => setActiveExploration(exp.id)}
              style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #e5e5e5',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.09)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              {/* Preview swatch */}
              <div style={{
                height: 'clamp(120px, 20vw, 160px)',
                background: exp.bg,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px',
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: exp.id === 'd' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.35)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  backgroundColor: exp.id === 'd' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(8px)',
                }}>
                  {exp.tag}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#aaa',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  Exploration {exp.id.toUpperCase()}
                </span>
                <h2 style={{
                  fontSize: 'clamp(18px, 3vw, 22px)',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  margin: '6px 0 10px 0',
                }}>
                  {exp.name}
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                }}>
                  {exp.description}
                </p>

                <button style={{
                  padding: '11px 20px',
                  backgroundColor: exp.id === 'd' ? '#3d4a5c' : exp.accent,
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '13px',
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

        {/* Design Brief */}
        <div style={{
          marginTop: 'clamp(40px, 8vw, 72px)',
          padding: 'clamp(20px, 4vw, 36px)',
          backgroundColor: '#fff',
          borderRadius: '20px',
          border: '1px solid #e5e5e5',
        }}>
          <h3 style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#aaa',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: '0 0 20px 0',
          }}>
            Design Brief
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(20px, 4vw, 36px)',
          }}>
            {[
              {
                title: 'Core Navigation',
                items: ['Projects (task management)', 'Calendar (time blocking)', 'Timer (pomodoro/stopwatch)', 'Cycle Tracker (28-day habits)', 'Insights (time allocation)'],
              },
              {
                title: 'Design Principles',
                items: ['Low visual noise', 'Strong spacing and hierarchy', 'Soft, calming colors', 'No gamification or streaks', 'Emotionally safe and non-judgmental'],
              },
              {
                title: 'Target Users',
                items: ['Neurodivergent users', 'ADHD and overstimulated users', 'People overwhelmed by cluttered to-do lists', 'Visual planners who want digital tools'],
              },
            ].map(section => (
              <div key={section.title}>
                <h4 style={{ fontSize: '15px', color: '#1a1a1a', margin: '0 0 10px 0', fontWeight: 500 }}>
                  {section.title}
                </h4>
                <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '13px', color: '#666', lineHeight: 1.9 }}>
                  {section.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
