import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { Project, Task, ScheduledTask, TimeEntry, PlannerStore } from '../types'

// --- Supabase row shapes ---
type ProjectRow = { id: string; user_id: string; name: string; color: string; created_at: string }
type TaskRow = { id: string; user_id: string; project_id: string; name: string; done: boolean; created_at: string }
type ScheduledTaskRow = { id: string; user_id: string; task_id: string; project_id: string; date: string; start_hour: number | null; duration_hours: number | null; created_at: string }
type TimeEntryRow = { id: string; user_id: string; project_id: string; task_id: string | null; scheduled_task_id: string | null; seconds: number; date: string; source: 'timer' | 'manual'; created_at: string }

const toProject = (r: ProjectRow): Project => ({ id: r.id, name: r.name, color: r.color, createdAt: r.created_at })
const toTask = (r: TaskRow): Task => ({ id: r.id, projectId: r.project_id, name: r.name, done: r.done, createdAt: r.created_at })
const toScheduledTask = (r: ScheduledTaskRow): ScheduledTask => ({
  id: r.id, taskId: r.task_id, projectId: r.project_id, date: r.date,
  startHour: r.start_hour ?? undefined, durationHours: r.duration_hours ?? undefined,
})
const toTimeEntry = (r: TimeEntryRow): TimeEntry => ({
  id: r.id, projectId: r.project_id, taskId: r.task_id ?? undefined,
  scheduledTaskId: r.scheduled_task_id ?? undefined,
  seconds: r.seconds, date: r.date, source: r.source, createdAt: r.created_at,
})

const PROJECT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
]

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function parseLS<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

export function usePlanner(userId: string | null, isAnonymous: boolean): PlannerStore {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  // Track previous isAnonymous to detect guest → signed-in transition
  const prevIsAnonymous = useRef(isAnonymous)

  // --- Init: load data from localStorage (guest) or Supabase (signed-in) ---
  useEffect(() => {
    if (!userId) { setLoading(false); return }

    if (isAnonymous) {
      setProjects(parseLS('planner:projects'))
      setTasks(parseLS('planner:tasks'))
      setScheduledTasks(parseLS('planner:scheduled'))
      setTimeEntries(parseLS('planner:timeEntries'))
      setLoading(false)
      return
    }

    // Signed-in: fetch from Supabase
    async function fetchFromSupabase() {
      const [p, t, s, e] = await Promise.all([
        supabase.from('projects').select('*').order('created_at'),
        supabase.from('tasks').select('*').order('created_at'),
        supabase.from('scheduled_tasks').select('*').order('created_at'),
        supabase.from('time_entries').select('*').order('created_at'),
      ])
      setProjects((p.data ?? []).map(toProject))
      setTasks((t.data ?? []).map(toTask))
      setScheduledTasks((s.data ?? []).map(toScheduledTask))
      setTimeEntries((e.data ?? []).map(toTimeEntry))
      setLoading(false)
    }

    fetchFromSupabase()
  }, [userId, isAnonymous])

  // --- Mirror guest state to localStorage ---
  useEffect(() => { if (isAnonymous) localStorage.setItem('planner:projects', JSON.stringify(projects)) }, [projects, isAnonymous])
  useEffect(() => { if (isAnonymous) localStorage.setItem('planner:tasks', JSON.stringify(tasks)) }, [tasks, isAnonymous])
  useEffect(() => { if (isAnonymous) localStorage.setItem('planner:scheduled', JSON.stringify(scheduledTasks)) }, [scheduledTasks, isAnonymous])
  useEffect(() => { if (isAnonymous) localStorage.setItem('planner:timeEntries', JSON.stringify(timeEntries)) }, [timeEntries, isAnonymous])

  // --- Migrate guest data to Supabase when upgrading ---
  useEffect(() => {
    if (!prevIsAnonymous.current || isAnonymous || !userId) {
      prevIsAnonymous.current = isAnonymous
      return
    }
    prevIsAnonymous.current = isAnonymous

    // Transition: was anonymous, now signed in → batch-insert all data to Supabase
    async function migrate() {
      const uid = userId!
      if (projects.length) {
        await supabase.from('projects').insert(
          projects.map(p => ({ id: p.id, user_id: uid, name: p.name, color: p.color, created_at: p.createdAt }))
        )
      }
      if (tasks.length) {
        await supabase.from('tasks').insert(
          tasks.map(t => ({ id: t.id, user_id: uid, project_id: t.projectId, name: t.name, done: t.done, created_at: t.createdAt }))
        )
      }
      if (scheduledTasks.length) {
        await supabase.from('scheduled_tasks').insert(
          scheduledTasks.map(s => ({
            id: s.id, user_id: uid, task_id: s.taskId, project_id: s.projectId,
            date: s.date, start_hour: s.startHour ?? null, duration_hours: s.durationHours ?? null,
          }))
        )
      }
      if (timeEntries.length) {
        await supabase.from('time_entries').insert(
          timeEntries.map(e => ({
            id: e.id, user_id: uid, project_id: e.projectId, task_id: e.taskId ?? null,
            scheduled_task_id: e.scheduledTaskId ?? null, seconds: e.seconds,
            date: e.date, source: e.source, created_at: e.createdAt,
          }))
        )
      }
      ;['planner:projects', 'planner:tasks', 'planner:scheduled', 'planner:timeEntries']
        .forEach(k => localStorage.removeItem(k))
    }

    migrate()
  }, [isAnonymous, userId])

  // --- Projects ---

  const addProject = useCallback((name: string, color?: string): Project => {
    const p: Project = {
      id: crypto.randomUUID(),
      name,
      color: color ?? PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)],
      createdAt: new Date().toISOString(),
    }
    setProjects(prev => [...prev, p])
    if (!isAnonymous) {
      supabase.from('projects').insert({
        id: p.id, user_id: userId!, name: p.name, color: p.color, created_at: p.createdAt,
      }).then(({ error }) => { if (error) console.error('addProject', error) })
    }
    return p
  }, [isAnonymous, userId])

  const updateProject = useCallback((id: string, patch: Partial<Pick<Project, 'name' | 'color'>>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p))
    if (!isAnonymous) {
      supabase.from('projects').update(patch).eq('id', id)
        .then(({ error }) => { if (error) console.error('updateProject', error) })
    }
  }, [isAnonymous])

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    setTasks(prev => prev.filter(t => t.projectId !== id))
    setScheduledTasks(prev => prev.filter(s => s.projectId !== id))
    setTimeEntries(prev => prev.filter(e => e.projectId !== id))
    if (!isAnonymous) {
      supabase.from('projects').delete().eq('id', id)
        .then(({ error }) => { if (error) console.error('deleteProject', error) })
    }
  }, [isAnonymous])

  // --- Tasks ---

  const addTask = useCallback((projectId: string, name: string): Task => {
    const t: Task = { id: crypto.randomUUID(), projectId, name, done: false, createdAt: new Date().toISOString() }
    setTasks(prev => [...prev, t])
    if (!isAnonymous) {
      supabase.from('tasks').insert({
        id: t.id, user_id: userId!, project_id: t.projectId, name: t.name, done: t.done, created_at: t.createdAt,
      }).then(({ error }) => { if (error) console.error('addTask', error) })
    }
    return t
  }, [isAnonymous, userId])

  const updateTask = useCallback((id: string, patch: Partial<Pick<Task, 'name' | 'done'>>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
    if (!isAnonymous) {
      supabase.from('tasks').update(patch).eq('id', id)
        .then(({ error }) => { if (error) console.error('updateTask', error) })
    }
  }, [isAnonymous])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    setScheduledTasks(prev => prev.filter(s => s.taskId !== id))
    if (!isAnonymous) {
      supabase.from('tasks').delete().eq('id', id)
        .then(({ error }) => { if (error) console.error('deleteTask', error) })
    }
  }, [isAnonymous])

  // --- Calendar scheduling ---

  const scheduleTask = useCallback((
    taskId: string, projectId: string, date: string,
    startHour?: number, durationHours?: number,
  ): ScheduledTask => {
    const s: ScheduledTask = { id: crypto.randomUUID(), taskId, projectId, date, startHour, durationHours }
    setScheduledTasks(prev => [...prev, s])
    if (!isAnonymous) {
      supabase.from('scheduled_tasks').insert({
        id: s.id, user_id: userId!, task_id: s.taskId, project_id: s.projectId,
        date: s.date, start_hour: s.startHour ?? null, duration_hours: s.durationHours ?? null,
      }).then(({ error }) => { if (error) console.error('scheduleTask', error) })
    }
    return s
  }, [isAnonymous, userId])

  const unscheduleTask = useCallback((scheduledTaskId: string) => {
    setScheduledTasks(prev => prev.filter(s => s.id !== scheduledTaskId))
    if (!isAnonymous) {
      supabase.from('scheduled_tasks').delete().eq('id', scheduledTaskId)
        .then(({ error }) => { if (error) console.error('unscheduleTask', error) })
    }
  }, [isAnonymous])

  // --- Time logging ---

  const logTime = useCallback((
    projectId: string,
    seconds: number,
    opts?: { taskId?: string; scheduledTaskId?: string; source?: 'timer' | 'manual' },
  ): TimeEntry => {
    const e: TimeEntry = {
      id: crypto.randomUUID(), projectId, taskId: opts?.taskId, scheduledTaskId: opts?.scheduledTaskId,
      seconds, date: todayISO(), source: opts?.source ?? 'manual', createdAt: new Date().toISOString(),
    }
    setTimeEntries(prev => [...prev, e])
    if (!isAnonymous) {
      supabase.from('time_entries').insert({
        id: e.id, user_id: userId!, project_id: e.projectId, task_id: e.taskId ?? null,
        scheduled_task_id: e.scheduledTaskId ?? null, seconds: e.seconds,
        date: e.date, source: e.source, created_at: e.createdAt,
      }).then(({ error }) => { if (error) console.error('logTime', error) })
    }
    return e
  }, [isAnonymous, userId])

  // --- Derived helpers ---

  const getProjectTotalSeconds = useCallback((projectId: string): number =>
    timeEntries.filter(e => e.projectId === projectId).reduce((sum, e) => sum + e.seconds, 0),
  [timeEntries])

  const getProjectLastWorked = useCallback((projectId: string): string | null => {
    const entries = timeEntries.filter(e => e.projectId === projectId)
    if (!entries.length) return null
    return entries.reduce((latest, e) => (e.date > latest ? e.date : latest), entries[0].date)
  }, [timeEntries])

  const getScheduledTasksForDate = useCallback((date: string) =>
    scheduledTasks.filter(s => s.date === date).flatMap(s => {
      const task = tasks.find(t => t.id === s.taskId)
      const project = projects.find(p => p.id === s.projectId)
      if (!task || !project) return []
      return [{ ...s, task, project }]
    }),
  [scheduledTasks, tasks, projects])

  const getTodayScheduledTasks = useCallback(() =>
    getScheduledTasksForDate(todayISO()), [getScheduledTasksForDate])

  return {
    loading, projects, tasks, scheduledTasks, timeEntries,
    addProject, updateProject, deleteProject,
    addTask, updateTask, deleteTask,
    scheduleTask, unscheduleTask, logTime,
    getProjectTotalSeconds, getProjectLastWorked,
    getScheduledTasksForDate, getTodayScheduledTasks,
  }
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export function formatSeconds(s: number): string {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min${m !== 1 ? 's' : ''}`
  const h = Math.floor(m / 60)
  const rem = m % 60
  return rem ? `${h}h ${rem}m` : `${h}h`
}
