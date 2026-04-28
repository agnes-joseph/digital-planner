import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { AuthState } from '@/hooks/useAuth'

type Mode = 'sign-in' | 'sign-up'

export default function AuthView({ auth }: { auth: AuthState }) {
  const [mode, setMode] = useState<Mode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) return
    setLoading(true)
    setError(null)
    const { error } = mode === 'sign-in'
      ? await auth.signIn(email.trim(), password)
      : await auth.signUp(email.trim(), password)
    if (error) setError(error)
    setLoading(false)
  }

  async function handleGuest() {
    setGuestLoading(true)
    const { error } = await auth.signInAsGuest()
    if (error) { setError(error); setGuestLoading(false) }
  }

  function toggle() {
    setMode(m => m === 'sign-in' ? 'sign-up' : 'sign-in')
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xs space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Planner</h1>
          <p className="text-sm text-muted-foreground mt-1">Your calm, focused companion.</p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              className="w-full h-10 rounded-xl border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-10 rounded-xl border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading || !email.trim() || !password}
            >
              {loading ? 'Loading…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <p className="text-xs text-center text-muted-foreground">
            {mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={toggle} className="underline underline-offset-2 text-foreground">
              {mode === 'sign-in' ? 'Create one' : 'Sign in'}
            </button>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={handleGuest}
            disabled={guestLoading}
          >
            {guestLoading ? 'Loading…' : 'Continue as guest'}
          </Button>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Guest data stays on this device. Create an account to sync across devices.
          </p>
        </div>
      </div>
    </div>
  )
}
