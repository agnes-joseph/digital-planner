import { useState } from 'react'
import ExplorationA from './explorations/ExplorationA'
import ExplorationB from './explorations/ExplorationB'
import ExplorationC from './explorations/ExplorationC'

const explorations = [
  {
    id: 'a',
    name: 'Soft Horizon',
    description: 'Mobile-first with serene mauve-to-cream gradient. Glassmorphism cards, pill-shaped bottom navigation, and calendar-first approach with quick actions.',
    gradient: 'linear-gradient(180deg, #8B9CAB 0%, #B8A9A0 40%, #D4C8C0 100%)',
  },
  {
    id: 'b',
    name: 'Quiet Focus',
    description: 'Dashboard-style with cool steel-blue gradient. Vertical sidebar navigation showing at-a-glance summaries. Professional yet calming aesthetic.',
    gradient: 'linear-gradient(135deg, #6B7A8C 0%, #8895A5 30%, #BFC6CE 100%)',
  },
  {
    id: 'c',
    name: 'Paper Journal',
    description: 'Journal-style spreads with warm parchment gradient and soft rose accents. Dot navigation mimics physical journal. Interactive 28-day habit grid.',
    gradient: 'linear-gradient(160deg, #9B8A85 0%, #B5A69E 25%, #E5DDD8 100%)',
  },
]

export default function App() {
  const [activeExploration, setActiveExploration] = useState<string | null>(null)

  if (activeExploration === 'a') {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveExploration(null)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Back to Overview
        </button>
        <ExplorationA />
      </div>
    )
  }

  if (activeExploration === 'b') {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveExploration(null)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Back to Overview
        </button>
        <ExplorationB />
      </div>
    )
  }

  if (activeExploration === 'c') {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveExploration(null)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Back to Overview
        </button>
        <ExplorationC />
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen p-8 md:p-12"
      style={{
        background: 'linear-gradient(180deg, #8B9CAB 0%, #A5A09B 50%, #C4BCB5 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-light text-white tracking-tight mb-3">
            tempo
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            A calm, visual productivity app for neurodivergent users.
            Three design explorations for review.
          </p>
        </header>

        {/* Exploration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {explorations.map(exp => (
            <div
              key={exp.id}
              onClick={() => setActiveExploration(exp.id)}
              className="group rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 cursor-pointer transition-all hover:scale-[1.02] hover:bg-white/15"
            >
              {/* Gradient Preview */}
              <div 
                className="h-40 flex items-center justify-center"
                style={{ background: exp.gradient }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                  <span className="text-white/80 text-2xl font-light">
                    {exp.id.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-white/50 text-xs uppercase tracking-widest">
                  Exploration {exp.id.toUpperCase()}
                </span>
                <h2 className="text-xl font-medium text-white mt-2 mb-3">
                  {exp.name}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  {exp.description}
                </p>

                <button className="mt-5 w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium group-hover:bg-white/20 transition-colors">
                  View Exploration
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Design Brief */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8">
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-6">
            Design Brief
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-medium mb-3">Core Navigation</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Projects (task management)</li>
                <li>Calendar (time blocking)</li>
                <li>Timer (pomodoro/stopwatch)</li>
                <li>Cycle Tracker (28-day habits)</li>
                <li>Insights (time allocation)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Design Principles</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Low visual noise</li>
                <li>Strong spacing and hierarchy</li>
                <li>Soft, calming colors</li>
                <li>No gamification or streaks</li>
                <li>Emotionally safe and non-judgmental</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Target Users</h4>
              <ul className="space-y-2 text-white/60 text-sm">
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
