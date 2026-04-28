import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { SharedProps } from '../types'

const POMODORO = 25 * 60
const RADIUS = 88
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function formatLogged(s: number) {
  if (s < 60) return `${s}s logged`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m logged`
  const h = Math.floor(m / 60)
  const rem = m % 60
  return rem ? `${h}h ${rem}m logged` : `${h}h logged`
}

export default function TimerView({ timer, navigate, startTimer, pauseTimer, skipTimer, setMode, setProject, planner }: SharedProps) {
  const elapsed =
    timer.mode === 'pomodoro'
      ? timer.totalSeconds - timer.seconds
      : timer.seconds % POMODORO
  const total = timer.mode === 'pomodoro' ? timer.totalSeconds : POMODORO
  const progress = total > 0 ? elapsed / total : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const firstProjectId = planner.projects[0]?.id ?? ''

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('dashboard')}
          className="rounded-full"
        >
          <ArrowLeft size={12} />
          Dashboard
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-10 pb-16">
        {/* Mode toggle */}
        <div className="flex border border-border rounded-full p-0.5">
          {(['pomodoro', 'stopwatch'] as const).map(m => (
            <Button
              key={m}
              variant={timer.mode === m ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full px-5 capitalize"
              onClick={() => setMode(m)}
            >
              {m === 'pomodoro' ? 'Pomodoro' : 'Stopwatch'}
            </Button>
          ))}
        </div>

        {/* Progress ring */}
        <div className="relative flex items-center justify-center" style={{ width: 256, height: 256 }}>
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100" cy="100" r={RADIUS}
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-border"
            />
            <circle
              cx="100" cy="100" r={RADIUS}
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="text-foreground transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="relative text-center">
            <div className="text-5xl tabular-nums font-light tracking-tight">
              {formatTime(timer.seconds)}
            </div>
            {timer.loggedSeconds > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {formatLogged(timer.loggedSeconds)}
              </p>
            )}
          </div>
        </div>

        {/* Project selector */}
        {planner.projects.length > 0 ? (
          <Select
            value={timer.projectId ?? ''}
            onValueChange={setProject}
          >
            <SelectTrigger className="w-48 rounded-lg border-border bg-background">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {planner.projects.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-muted-foreground">Add a project first</p>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {timer.running ? (
            <Button
              size="lg"
              className="rounded-full px-10"
              onClick={pauseTimer}
            >
              Pause
            </Button>
          ) : (
            <Button
              size="lg"
              className="rounded-full px-10"
              disabled={!timer.projectId && !firstProjectId}
              onClick={() => startTimer(timer.projectId ?? firstProjectId)}
            >
              Start
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={skipTimer}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
