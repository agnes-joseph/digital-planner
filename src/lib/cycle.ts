export interface CycleSettings {
  startDate: string
  weekStart: 'monday' | 'sunday'
}

export interface CycleStatus {
  twelveWeekYearNumber: number
  cycleNumber: number
  dayOfCycle: number
  weekOfYear: number
  isRestWeek: boolean
  dayOfYear: number
}

const YEAR_DAYS = 91
const WORK_DAYS = 84
const CYCLE_DAYS = 28

export function getCycleStatus(settings: CycleSettings, today: Date): CycleStatus {
  const [y, m, d] = settings.startDate.split('-').map(Number)
  // Use UTC to avoid DST shifts corrupting the day count
  const startUtc = Date.UTC(y, m - 1, d)
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const daysSinceStart = Math.round((todayUtc - startUtc) / 86_400_000)
  const safeDays = Math.max(0, daysSinceStart)

  const twelveWeekYearNumber = Math.floor(safeDays / YEAR_DAYS) + 1
  const positionInYear = safeDays % YEAR_DAYS
  const isRestWeek = positionInYear >= WORK_DAYS
  const cycleNumber = Math.min(Math.floor(positionInYear / CYCLE_DAYS) + 1, 3)
  const dayOfCycle = isRestWeek ? 28 : (positionInYear % CYCLE_DAYS) + 1
  const weekOfYear = Math.min(Math.floor(positionInYear / 7) + 1, 12)
  const dayOfYear = positionInYear + 1

  return { twelveWeekYearNumber, cycleNumber, dayOfCycle, weekOfYear, isRestWeek, dayOfYear }
}
