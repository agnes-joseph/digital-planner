import { useState } from 'react'
import { CaretRight, Play, GearSix } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCycleStatus } from '@/lib/cycle'
import { formatSeconds, formatDate } from '@/store/usePlanner'
import type { SharedProps } from '../types'

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function NavBtn({ onClick, inverted }: { onClick: () => void; inverted?: boolean }) {
  return (
    <Button
      variant="outline"
      size="icon-xs"
      onClick={onClick}
      className={cn(
        'rounded-lg shrink-0',
        inverted && 'border-background/30 text-background hover:bg-background/10',
      )}
    >
      <CaretRight size={10} weight="bold" />
    </Button>
  )
}

export default function Dashboard({ timer, startTimer, navigate, cycleSettings, planner }: SharedProps) {
  const [logTargetId, setLogTargetId] = useState<string | null>(null)
  const [logInput, setLogInput] = useState('')

  const today = new Date()
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const dateLabel = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  const active = timer.running
  const cycleStatus = getCycleStatus(cycleSettings, today)

  const todayTasks = planner.getTodayScheduledTasks()
  const activeProjectName = timer.projectId
    ? planner.projects.find(p => p.id === timer.projectId)?.name ?? null
    : null

  function handleLogTime(projectId: string, taskId: string) {
    const mins = parseFloat(logInput)
    if (!isNaN(mins) && mins > 0) {
      planner.logTime(projectId, Math.round(mins * 60), { taskId, source: 'manual' })
    }
    setLogTargetId(null)
    setLogInput('')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Date header */}
        <div className="mt-4 mb-8 flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{dayName}</p>
            <h1 className="text-5xl font-bold mt-0.5">{dateLabel}</h1>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate('settings')}
            className="mt-1"
          >
            <GearSix size={16} />
          </Button>
        </div>

        {/* Top bento */}
        <div className="grid grid-cols-[2fr_3fr] gap-2.5 mb-2.5">
          {/* Left column */}
          <div className="flex flex-col gap-2.5">
            {/* Timer card */}
            <div
              className={cn(
                'rounded-2xl p-4 border transition-all duration-300',
                active ? 'bg-timer-active-bg text-background border-timer-active-bg' : 'bg-card border-border',
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={cn('text-[10px] tracking-widest uppercase', active ? 'text-background/50' : 'text-muted-foreground')}>
                  Timer
                </span>
                <NavBtn onClick={() => navigate('timer')} inverted={active} />
              </div>
              <div className="text-center py-3">
                <div className="text-4xl font-bold tabular-nums">{formatTime(timer.seconds)}</div>
                {active && activeProjectName && (
                  <p className="text-xs mt-2 text-background/60">{activeProjectName}</p>
                )}
              </div>
            </div>

            {/* Cycle card */}
            <div className="rounded-2xl p-4 border border-border bg-card flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Cycle</span>
                <NavBtn onClick={() => navigate('cycle')} />
              </div>
              {cycleStatus.isRestWeek ? (
                <p className="text-xs font-medium text-muted-foreground mb-2.5">Rest Week</p>
              ) : (
                <p className="text-xs text-muted-foreground mb-2.5">
                  Cycle {cycleStatus.cycleNumber}/3 · Day {cycleStatus.dayOfCycle}/28
                </p>
              )}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1
                  const isPast = cycleStatus.isRestWeek || day < cycleStatus.dayOfCycle
                  const isCurrent = !cycleStatus.isRestWeek && day === cycleStatus.dayOfCycle
                  return (
                    <div
                      key={i}
                      className={cn(
                        'aspect-square rounded-sm',
                        isPast && 'bg-cycle-past',
                        isCurrent && 'bg-cycle-current',
                        !isPast && !isCurrent && 'bg-cycle-future',
                      )}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Today card */}
          <div className="rounded-2xl p-4 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Today</span>
              <NavBtn onClick={() => navigate('today')} />
            </div>

            {todayTasks.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No tasks scheduled for today
              </p>
            ) : (
              <div className="divide-y divide-border">
                {todayTasks.map(st => (
                  <div key={st.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm truncate">{st.task.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{st.project.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        className="rounded-lg"
                        onClick={() => startTimer(st.projectId, st.taskId)}
                      >
                        <Play size={12} />
                      </Button>
                      {logTargetId === st.id ? (
                        <form
                          className="flex items-center gap-1"
                          onSubmit={e => { e.preventDefault(); handleLogTime(st.projectId, st.taskId) }}
                        >
                          <input
                            autoFocus
                            type="number"
                            min="0"
                            step="0.5"
                            placeholder="mins"
                            value={logInput}
                            onChange={e => setLogInput(e.target.value)}
                            onBlur={() => { setLogTargetId(null); setLogInput('') }}
                            className="w-16 text-xs border border-border rounded-lg px-2 py-1 bg-background"
                          />
                        </form>
                      ) : (
                        <Button
                          variant="outline"
                          size="xs"
                          className="rounded-lg"
                          onClick={() => setLogTargetId(st.id)}
                        >
                          Log time
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project card */}
        <div className="rounded-2xl p-4 border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Project</span>
            <NavBtn onClick={() => navigate('projects')} />
          </div>

          {planner.projects.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No projects yet</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {planner.projects.map(p => {
                const projectTasks = planner.tasks.filter(t => t.projectId === p.id)
                const preview = projectTasks.slice(0, 2)
                const more = Math.max(0, projectTasks.length - 2)
                const totalSeconds = planner.getProjectTotalSeconds(p.id)
                const lastWorked = planner.getProjectLastWorked(p.id)

                return (
                  <div key={p.id} className="border border-border rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <p className="text-sm font-medium truncate">{p.name}</p>
                    </div>
                    {totalSeconds > 0 && (
                      <p className="text-xs text-muted-foreground">{formatSeconds(totalSeconds)}</p>
                    )}
                    {lastWorked && (
                      <p className="text-xs text-muted-foreground">Last worked {formatDate(lastWorked)}</p>
                    )}
                    {preview.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {preview.map(t => (
                          <div key={t.id} className="border border-border rounded-lg px-2 py-1.5 text-xs text-muted-foreground truncate">
                            {t.name}
                          </div>
                        ))}
                      </div>
                    )}
                    {more > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wide">
                        {more} more task{more !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
