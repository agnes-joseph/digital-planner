import { useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCycleStatus } from '@/lib/cycle'
import type { CycleSettings } from '@/lib/cycle'
import type { AuthState } from '@/hooks/useAuth'
import type { View } from '../types'

interface SettingsViewProps {
  navigate: (v: View) => void
  cycleSettings: CycleSettings
  setCycleSettings: (s: CycleSettings) => void
  auth: AuthState
}

const YEAR_DAYS = 91

export default function SettingsView({ navigate, cycleSettings, setCycleSettings, auth }: SettingsViewProps) {
  const [localStartDate, setLocalStartDate] = useState(cycleSettings.startDate)
  const [localWeekStart, setLocalWeekStart] = useState<'monday' | 'sunday'>(cycleSettings.weekStart)
  const [upgradeEmail, setUpgradeEmail] = useState('')
  const [upgradePassword, setUpgradePassword] = useState('')
  const [upgradeStatus, setUpgradeStatus] = useState<'idle' | 'saving' | 'done'>('idle')
  const [upgradeError, setUpgradeError] = useState<string | null>(null)

  const localSettings: CycleSettings = { startDate: localStartDate, weekStart: localWeekStart }
  const preview = localStartDate ? getCycleStatus(localSettings, new Date()) : null

  async function handleUpgrade(e: React.FormEvent) {
    e.preventDefault()
    if (!upgradeEmail.trim() || !upgradePassword) return
    setUpgradeStatus('saving')
    setUpgradeError(null)
    const { error } = await auth.upgradeGuest(upgradeEmail.trim(), upgradePassword)
    if (error) { setUpgradeError(error); setUpgradeStatus('idle') }
    else setUpgradeStatus('done')
  }

  function save() {
    setCycleSettings(localSettings)
    navigate('dashboard')
  }

return (
    <div className="min-h-screen p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('dashboard')}
            className="rounded-full"
          >
            <ArrowLeft size={12} />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-muted-foreground"
            onClick={auth.signOut}
          >
            Sign out
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Card className="rounded-2xl shadow-sm ring-0 border border-border py-0 gap-0 overflow-visible">
          <CardContent className="px-5 py-5 space-y-5">
            {/* Start date */}
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                12-week year start date
              </label>
              <input
                type="date"
                value={localStartDate}
                onChange={e => setLocalStartDate(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">
                Each 12-week year is 91 days — 84 days of focused work (3 × 28-day cycles) followed by a 7-day rest week.
              </p>
            </div>

            <Separator />

            {/* Week start */}
            <div className="space-y-2">
              <label className="text-sm font-medium block">Week starts on</label>
              <div className="flex border border-border rounded-full p-0.5 w-fit">
                {(['monday', 'sunday'] as const).map(day => (
                  <Button
                    key={day}
                    variant={localWeekStart === day ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-full capitalize px-5"
                    onClick={() => setLocalWeekStart(day)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Account */}
            <div className="space-y-2">
              <label className="text-sm font-medium block">Account</label>
              {auth.isAnonymous ? (
                upgradeStatus === 'done' ? (
                  <p className="text-sm text-muted-foreground">
                    Account created. Your data is now synced as <span className="text-foreground">{auth.email}</span>.
                  </p>
                ) : (
                  <form onSubmit={handleUpgrade} className="space-y-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={upgradeEmail}
                      onChange={e => setUpgradeEmail(e.target.value)}
                      className="w-full h-9 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={upgradePassword}
                      onChange={e => setUpgradePassword(e.target.value)}
                      className="w-full h-9 rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="w-full rounded-lg"
                      disabled={upgradeStatus === 'saving' || !upgradeEmail.trim() || !upgradePassword}
                    >
                      {upgradeStatus === 'saving' ? 'Saving…' : 'Create account & sync'}
                    </Button>
                    {upgradeError && <p className="text-xs text-destructive">{upgradeError}</p>}
                    <p className="text-xs text-muted-foreground">
                      Create an account to sync your data across devices.
                    </p>
                  </form>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Signed in as <span className="text-foreground">{auth.email}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Live preview */}
        {preview && (
          <div className="mt-4 px-1">
            {preview.isRestWeek ? (
              <p className="text-sm text-muted-foreground">
                You're currently in the rest week of 12-week year #{preview.twelveWeekYearNumber}.
                Next year starts in {YEAR_DAYS - preview.dayOfYear === 0 ? 'tomorrow' : `${YEAR_DAYS - preview.dayOfYear} day${YEAR_DAYS - preview.dayOfYear === 1 ? '' : 's'}`}.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                You're currently in 12-week year #{preview.twelveWeekYearNumber}, Cycle {preview.cycleNumber} of 3, Day {preview.dayOfCycle} of 28.
              </p>
            )}
          </div>
        )}

        <Button className="w-full mt-6 rounded-full" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  )
}
