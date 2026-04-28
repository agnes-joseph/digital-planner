import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getCycleStatus } from '@/lib/cycle'
import type { CycleSettings } from '@/lib/cycle'
import type { View } from '../types'

const YEAR_DAYS = 91
const WEEK_LABELS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEK_LABELS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CYCLES = [
  { number: 1, label: 'Cycle 1', days: 'Days 1–28' },
  { number: 2, label: 'Cycle 2', days: 'Days 29–56' },
  { number: 3, label: 'Cycle 3', days: 'Days 57–84' },
]

interface CycleViewProps {
  cycleSettings: CycleSettings
  navigate: (v: View) => void
}

export default function CycleView({ cycleSettings, navigate }: CycleViewProps) {
  const today = new Date()
  const status = getCycleStatus(cycleSettings, today)
  const weekLabels = cycleSettings.weekStart === 'sunday' ? WEEK_LABELS_SUN : WEEK_LABELS_MON
  const daysUntilNext = YEAR_DAYS - status.dayOfYear

  function cycleProgress(cycleNum: number): number {
    if (status.isRestWeek) return 100
    if (cycleNum < status.cycleNumber) return 100
    if (cycleNum > status.cycleNumber) return 0
    return Math.round((status.dayOfCycle / 28) * 100)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-lg mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('dashboard')}
          className="mb-8 rounded-full"
        >
          <ArrowLeft size={12} />
          Dashboard
        </Button>

        {/* Heading */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">12-Week Year</h1>
          <Badge variant="outline">Year #{status.twelveWeekYearNumber}</Badge>
        </div>

        {/* Status line */}
        <p className="text-sm text-muted-foreground mb-6">
          {status.isRestWeek
            ? `Rest Week · Week 13 · Day ${status.dayOfYear} of 91`
            : `Cycle ${status.cycleNumber} of 3 · Week ${status.weekOfYear} of 12 · Day ${status.dayOfYear} of 91`}
        </p>

        {/* Main card */}
        <Card className="rounded-2xl shadow-sm ring-0 border border-border mb-4 py-0 gap-0">
          <CardContent className="p-5">
            {status.isRestWeek ? (
              /* Rest week state */
              <div className="text-center py-8">
                <p className="text-2xl font-bold mb-2">Rest Week</p>
                <p className="text-sm text-muted-foreground">
                  12-week year #{status.twelveWeekYearNumber} complete.{' '}
                  {daysUntilNext === 0
                    ? 'Next year starts tomorrow.'
                    : `Next year starts in ${daysUntilNext} day${daysUntilNext === 1 ? '' : 's'}.`}
                </p>
              </div>
            ) : (
              <>
                {/* Column headers */}
                <div className="grid grid-cols-7 gap-1.5 mb-1">
                  {weekLabels.map(label => (
                    <div key={label} className="text-[10px] text-muted-foreground text-center">
                      {label}
                    </div>
                  ))}
                </div>

                {/* 28-square grid */}
                <div className="grid grid-cols-7 gap-1.5 mb-5">
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1
                    const isPast = day < status.dayOfCycle
                    const isCurrent = day === status.dayOfCycle
                    return (
                      <div
                        key={i}
                        className={cn(
                          'aspect-square rounded-md flex items-center justify-center',
                          isPast && 'bg-cycle-past',
                          isCurrent && 'bg-cycle-current ring-2 ring-foreground ring-offset-1',
                          !isPast && !isCurrent && 'bg-cycle-future',
                        )}
                      >
                        <span className="text-[9px] text-foreground/30 font-medium">{day}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Current cycle label + progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium">Cycle {status.cycleNumber} of 3</span>
                    <span className="text-xs text-muted-foreground">Day {status.dayOfCycle}/28</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-foreground transition-all"
                      style={{ width: `${Math.round((status.dayOfCycle / 28) * 100)}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Three-cycle progress */}
        <div className="grid grid-cols-3 gap-2">
          {CYCLES.map(cycle => {
            const progress = cycleProgress(cycle.number)
            const isActive = !status.isRestWeek && cycle.number === status.cycleNumber
            const isPast = status.isRestWeek || cycle.number < status.cycleNumber
            return (
              <div
                key={cycle.number}
                className={cn(
                  'border rounded-xl p-3',
                  isActive ? 'border-foreground' : 'border-border',
                  isPast && !isActive && 'opacity-60',
                )}
              >
                <p className={cn('text-xs font-medium mb-0.5', !isActive && !isPast && 'text-muted-foreground')}>
                  {cycle.label}
                </p>
                <p className="text-[10px] text-muted-foreground mb-2">{cycle.days}</p>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
