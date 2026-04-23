import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Return a dummy client for build time
    return {
      auth: {
        signInWithPassword: () => Promise.resolve({ error: new Error('Missing Env Vars') }),
        signOut: () => Promise.resolve(),
        getUser: () => Promise.resolve({ data: { user: null } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
