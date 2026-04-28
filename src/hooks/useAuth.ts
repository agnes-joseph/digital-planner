import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface AuthState {
  userId: string | null
  email: string | null
  isAnonymous: boolean
  loading: boolean
  signInAsGuest: () => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  upgradeGuest: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const GUEST_ID_KEY = 'planner:guestId'

export function useAuth(): AuthState {
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        applyUser(session.user)
      } else {
        // Restore guest session from localStorage if it exists
        const guestId = localStorage.getItem(GUEST_ID_KEY)
        if (guestId) { setUserId(guestId); setIsAnonymous(true) }
      }
    }).catch(() => {
      const guestId = localStorage.getItem(GUEST_ID_KEY)
      if (guestId) { setUserId(guestId); setIsAnonymous(true) }
    }).finally(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        applyUser(session.user)
      } else if (!localStorage.getItem(GUEST_ID_KEY)) {
        // Only clear state if not a guest
        setUserId(null)
        setEmail(null)
        setIsAnonymous(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  function applyUser(user: { id: string; email?: string; is_anonymous?: boolean }) {
    setUserId(user.id)
    setEmail(user.email ?? null)
    setIsAnonymous(false)
  }

  async function signInAsGuest(): Promise<{ error: string | null }> {
    let guestId = localStorage.getItem(GUEST_ID_KEY)
    if (!guestId) {
      guestId = crypto.randomUUID()
      localStorage.setItem(GUEST_ID_KEY, guestId)
    }
    setUserId(guestId)
    setIsAnonymous(true)
    return { error: null }
  }

  async function signIn(emailAddress: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signInWithPassword({ email: emailAddress, password })
    return { error: error?.message ?? null }
  }

  async function signUp(emailAddress: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signUp({ email: emailAddress, password })
    return { error: error?.message ?? null }
  }

  // Upgrades a guest to a permanent account; data migration handled in usePlanner
  async function upgradeGuest(emailAddress: string, password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signUp({ email: emailAddress, password })
    if (!error) localStorage.removeItem(GUEST_ID_KEY)
    return { error: error?.message ?? null }
  }

  async function signOut(): Promise<void> {
    if (isAnonymous) {
      localStorage.removeItem(GUEST_ID_KEY)
      setUserId(null)
      setEmail(null)
    } else {
      await supabase.auth.signOut()
    }
  }

  return { userId, email, isAnonymous, loading, signInAsGuest, signIn, signUp, upgradeGuest, signOut }
}
