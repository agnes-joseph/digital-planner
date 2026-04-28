import { useState, useCallback } from 'react'
import type { CycleSettings } from '@/lib/cycle'

const STORAGE_KEY = 'cycle-settings'
const DEFAULT: CycleSettings = { startDate: '2026-01-05', weekStart: 'monday' }

export function useCycleSettings(): [CycleSettings, (s: CycleSettings) => void] {
  const [settings, setSettingsState] = useState<CycleSettings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return { ...DEFAULT, ...JSON.parse(raw) }
    } catch {}
    return DEFAULT
  })

  const setSettings = useCallback((s: CycleSettings) => {
    setSettingsState(s)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  }, [])

  return [settings, setSettings]
}
