import { useState, useEffect, useCallback, useRef } from 'react'
import Dashboard from './views/Dashboard'
import TimerView from './views/TimerView'
import TodayView from './views/TodayView'
import CycleView from './views/CycleView'
import ProjectsView from './views/ProjectsView'
import SettingsView from './views/SettingsView'
import AuthView from './views/AuthView'
import { useCycleSettings } from './hooks/useCycleSettings'
import { useAuth } from './hooks/useAuth'
import { usePlanner } from './store/usePlanner'
import type { View, TimerState, TimerMode } from './types'

const POMODORO = 25 * 60

const initialTimer: TimerState = {
  running: false,
  seconds: POMODORO,
  totalSeconds: POMODORO,
  mode: 'pomodoro',
  projectId: null,
  taskId: null,
  loggedSeconds: 0,
}

export default function App() {
  const [view, setView] = useState<View>(() => {
    const p = new URLSearchParams(window.location.search).get('view')
    return (p as View) ?? 'dashboard'
  })
  const [timer, setTimer] = useState<TimerState>(initialTimer)
  const [cycleSettings, setCycleSettings] = useCycleSettings()
  const auth = useAuth()
  const planner = usePlanner(auth.userId, auth.isAnonymous)

  const logTimeRef = useRef(planner.logTime)
  const timerRef = useRef(timer)
  useEffect(() => { logTimeRef.current = planner.logTime }, [planner.logTime])
  useEffect(() => { timerRef.current = timer }, [timer])

  useEffect(() => {
    if (!timer.running) return
    const id = setInterval(() => {
      setTimer(t => {
        if (t.mode === 'pomodoro') {
          const next = t.seconds - 1
          if (next <= 0) {
            setTimeout(() => {
              const { projectId, taskId, totalSeconds } = timerRef.current
              if (projectId) {
                logTimeRef.current(projectId, totalSeconds, { taskId: taskId ?? undefined, source: 'timer' })
              }
            }, 0)
            return { ...t, running: false, seconds: 0, loggedSeconds: t.loggedSeconds + t.totalSeconds }
          }
          return { ...t, seconds: next }
        }
        return { ...t, seconds: t.seconds + 1, loggedSeconds: t.seconds + 1 }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timer.running, timer.mode])

  const startTimer = useCallback((projectId: string, taskId?: string | null) => {
    setTimer(t => ({ ...t, running: true, projectId, taskId: taskId ?? t.taskId }))
  }, [])

  const pauseTimer = useCallback(() => {
    setTimer(t => ({ ...t, running: false }))
  }, [])

  const skipTimer = useCallback(() => {
    setTimer(t => {
      const elapsed = Math.max(0, t.totalSeconds - t.seconds)
      if (t.projectId && elapsed > 0) {
        setTimeout(() => {
          logTimeRef.current(t.projectId!, elapsed, { taskId: t.taskId ?? undefined, source: 'timer' })
        }, 0)
      }
      return { ...t, running: false, seconds: t.totalSeconds, loggedSeconds: t.loggedSeconds + elapsed }
    })
  }, [])

  const setMode = useCallback((mode: TimerMode) => {
    const total = mode === 'pomodoro' ? POMODORO : 0
    setTimer(t => ({ ...t, mode, seconds: total, totalSeconds: total, running: false }))
  }, [])

  const setProject = useCallback((projectId: string) => {
    setTimer(t => ({ ...t, projectId }))
  }, [])

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    )
  }

  if (!auth.userId) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AuthView auth={auth} />
      </div>
    )
  }

  if (planner.loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    )
  }

  const shared = { timer, startTimer, pauseTimer, skipTimer, setMode, setProject, navigate: setView, cycleSettings, planner }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {view === 'dashboard' && <Dashboard {...shared} />}
      {view === 'timer' && <TimerView {...shared} />}
      {view === 'today' && <TodayView {...shared} />}
      {view === 'cycle' && <CycleView cycleSettings={cycleSettings} navigate={setView} />}
      {view === 'projects' && <ProjectsView navigate={setView} planner={planner} />}
      {view === 'settings' && (
        <SettingsView
          navigate={setView}
          cycleSettings={cycleSettings}
          setCycleSettings={setCycleSettings}
          auth={auth}
        />
      )}
    </div>
  )
}
