import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

/** A sessão é gerenciada pelo Supabase Auth; dados do currículo não são persistidos. */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [recoveryRequired, setRecoveryRequired] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setAuthLoading(false)
        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryRequired(true)
        }
        if (event === 'SIGNED_OUT') {
          setRecoveryRequired(false)
        }
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, authLoading, recoveryRequired, completeRecovery: () => setRecoveryRequired(false) }
}
