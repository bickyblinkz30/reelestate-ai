import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: Record<string, unknown>) => {
          try {
            cookieStore.set(name, value, options as any)
          } catch {
            // In some contexts (like SSG), cookies cannot be set
          }
        },
        remove: (name: string, options: Record<string, unknown>) => {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 } as any)
          } catch {
            // In some contexts (like SSG), cookies cannot be removed
          }
        },
      },
    }
  )
}
