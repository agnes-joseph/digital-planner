import { Fragment, useState } from 'react'
import { ArrowLeft, Pause, Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { SharedProps } from '../types'

const START_HOUR = 8
const END_HOUR = 18
const TOTAL_HOURS = END_HOUR - START_HOUR
const ROW_H = 56
const HOURS = Array.from({ length: TOTAL_HOURS }, (_, i) => START_HOUR + i)
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function getWeekDays() {
  const today = new Date()
  const diff = 1 - today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)
  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const iso = d.toISOString().slice(0, 10)
    return { label, date: d.getDate(), iso, isToday: d.toDateString() === today.toDateString() }
  })
}

export default function TodayView({ timer, navigate, pauseTimer, startTimer, setProject, planner }: SharedProps) {
  const weekDays = getWeekDays()

  // Which project's tasks to show in the sidebar
  const [sidebarProjectId, setSidebarProjectId] = useState<string>(
    () => planner.projects[0]?.id ?? ''
  )

  const activeProjectName = timer.projectId
    ? planner.projects.find(p => p.id === timer.projectId)?.name ?? null
    : null

  // Tasks for the selected project that are not yet scheduled today
  const todayISO = new Date().toISOString().slice(0, 10)
  const scheduledTaskIds = new Set(
    planner.scheduledTasks.filter(s => s.date === todayISO).map(s => s.taskId)
  )
  const sidebarTasks = planner.tasks.filter(
    t => t.projectId === sidebarProjectId && !t.done
  )

  // Build calendar events from scheduled tasks across the current week
  const calendarEvents = weekDays.flatMap((day, dayIndex) => {
    return planner.getScheduledTasksForDate(day.iso)
      .filter(st => st.startHour !== undefined)
      .map(st => ({
        id: st.id,
        title: st.task.name,
        dayIndex,
        startHour: st.startHour!,
        durationHours: st.durationHours ?? 1,
        color: st.project.color,
        scheduledTaskId: st.id,
      }))
  })

  function handleScheduleTask(taskId: string) {
    planner.scheduleTask(taskId, sidebarProjectId, todayISO)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-2 shrink-0">
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

        {/* Active timer bar */}
        {timer.running && (
          <div className="mx-4 mb-2 shrink-0">
            <div className="flex items-center justify-between bg-foreground text-background rounded-full px-5 py-2.5 text-sm">
              <span className="tabular-nums">{formatTime(timer.seconds)}</span>
              <span className="text-background/50 text-xs">{activeProjectName}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={pauseTimer}
                className="rounded-full bg-background/20 hover:bg-background/30 text-background"
              >
                <Pause size={12} weight="fill" />
              </Button>
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="flex-1 overflow-auto">
          {/* Day header (sticky) */}
          <div className="sticky top-0 z-10 bg-background border-b border-border">
            <div className="grid border-collapse" style={{ gridTemplateColumns: '3rem repeat(5, 1fr)' }}>
              <div className="h-10" />
              {weekDays.map((d, i) => (
                <div key={i} className="py-2 text-center border-l border-border">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{d.label}</span>
                  <div className={cn('text-sm mt-0.5', d.isToday ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                    {d.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid + events */}
          <div className="relative" style={{ height: TOTAL_HOURS * ROW_H }}>
            {/* Hour row lines */}
            <div
              className="absolute inset-0 grid"
              style={{ gridTemplateColumns: '3rem repeat(5, 1fr)', gridTemplateRows: `repeat(${TOTAL_HOURS}, ${ROW_H}px)` }}
            >
              {HOURS.flatMap(h => (
                <Fragment key={h}>
                  <div className="flex items-start justify-end pr-2 pt-1 border-b border-border">
                    <span className="text-[10px] text-muted-foreground">{h}:00</span>
                  </div>
                  {DAY_LABELS.map((_, i) => (
                    <div key={i} className="border-b border-border border-l border-border" />
                  ))}
                </Fragment>
              ))}
            </div>

            {/* Events overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ display: 'grid', gridTemplateColumns: '3rem repeat(5, 1fr)' }}
            >
              <div />
              {DAY_LABELS.map((_, dayIndex) => {
                const dayEvents = calendarEvents.filter(e => e.dayIndex === dayIndex)
                return (
                  <div key={dayIndex} className="relative">
                    {dayEvents.map(ev => (
                      <div
                        key={ev.id}
                        className="absolute rounded border text-[11px] px-1.5 py-0.5 overflow-hidden pointer-events-auto cursor-pointer"
                        style={{
                          top: (ev.startHour - START_HOUR) * ROW_H + 1,
                          height: ev.durationHours * ROW_H - 2,
                          left: 4,
                          right: 4,
                          backgroundColor: ev.color + '22',
                          borderColor: ev.color + '66',
                          color: ev.color,
                        }}
                        onClick={() => planner.unscheduleTask(ev.scheduledTaskId)}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-68 shrink-0 border-l border-border bg-muted/30 flex flex-col p-4" style={{ width: 272 }}>
        <div className="flex justify-end mb-5 mt-10">
          {planner.projects.length > 0 ? (
            <Select
              value={sidebarProjectId}
              onValueChange={(val) => {
                setSidebarProjectId(val)
                setProject(val)
              }}
            >
              <SelectTrigger className="w-40 rounded-lg border-border bg-background">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {planner.projects.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-xs text-muted-foreground">No projects</span>
          )}
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
          {sidebarTasks.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No tasks</p>
          )}
          {sidebarTasks.map(task => (
            <Card
              key={task.id}
              className={cn(
                'cursor-pointer hover:bg-accent transition-colors',
                scheduledTaskIds.has(task.id) && 'opacity-50',
              )}
              onClick={() => !scheduledTaskIds.has(task.id) && handleScheduleTask(task.id)}
            >
              <div className="px-3 py-3 text-sm">{task.name}</div>
            </Card>
          ))}
        </div>

        <div className="pt-4">
          <Button
            className="w-full rounded-full"
            onClick={() => {
              const name = prompt('Task name')
              if (name?.trim() && sidebarProjectId) {
                planner.addTask(sidebarProjectId, name.trim())
              }
            }}
          >
            <Plus size={14} weight="bold" />
            Add task
          </Button>
        </div>
      </div>
    </div>
  )
}
