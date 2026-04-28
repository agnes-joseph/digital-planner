import type { CycleSettings } from '@/lib/cycle'

export type View = 'dashboard' | 'timer' | 'today' | 'cycle' | 'projects' | 'settings'
export type TimerMode = 'pomodoro' | 'stopwatch'

// --- Data model ---

export interface Project {
  id: string
  name: string
  color: string
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  name: string
  done: boolean
  createdAt: string
}

/** A task placed on the calendar for a specific date/time. */
export interface ScheduledTask {
  id: string
  taskId: string
  projectId: string
  date: string          // "YYYY-MM-DD"
  startHour?: number    // 0–23
  durationHours?: number
}

export interface TimeEntry {
  id: string
  projectId: string
  taskId?: string
  scheduledTaskId?: string
  seconds: number
  date: string          // "YYYY-MM-DD"
  source: 'timer' | 'manual'
  createdAt: string
}

export interface PlannerStore {
  loading: boolean
  projects: Project[]
  tasks: Task[]
  scheduledTasks: ScheduledTask[]
  timeEntries: TimeEntry[]
  // Projects
  addProject: (name: string, color?: string) => Project
  updateProject: (id: string, patch: Partial<Pick<Project, 'name' | 'color'>>) => void
  deleteProject: (id: string) => void
  // Tasks
  addTask: (projectId: string, name: string) => Task
  updateTask: (id: string, patch: Partial<Pick<Task, 'name' | 'done'>>) => void
  deleteTask: (id: string) => void
  // Calendar scheduling
  scheduleTask: (taskId: string, projectId: string, date: string, startHour?: number, durationHours?: number) => ScheduledTask
  unscheduleTask: (scheduledTaskId: string) => void
  // Time logging
  logTime: (projectId: string, seconds: number, opts?: { taskId?: string; scheduledTaskId?: string; source?: 'timer' | 'manual' }) => TimeEntry
  // Derived helpers
  getProjectTotalSeconds: (projectId: string) => number
  getProjectLastWorked: (projectId: string) => string | null  // "YYYY-MM-DD" or null
  getScheduledTasksForDate: (date: string) => Array<ScheduledTask & { task: Task; project: Project }>
  getTodayScheduledTasks: () => Array<ScheduledTask & { task: Task; project: Project }>
}

// --- Timer & shared props ---

export interface TimerState {
  running: boolean
  seconds: number
  totalSeconds: number
  mode: TimerMode
  projectId: string | null
  taskId: string | null
  loggedSeconds: number
}

export interface SharedProps {
  timer: TimerState
  startTimer: (projectId: string, taskId?: string | null) => void
  pauseTimer: () => void
  skipTimer: () => void
  setMode: (mode: TimerMode) => void
  setProject: (projectId: string) => void
  navigate: (view: View) => void
  cycleSettings: CycleSettings
  planner: PlannerStore
}
