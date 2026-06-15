import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'email' | 'recovery' | 'invite' | null

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  let sessionError = null

  if (token_hash && type) {
    // Magic link flow
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    sessionError = error
  } else if (code) {
    // OAuth / PKCE flow
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    sessionError = error
  } else {
    // No token or code — send back to login
    return NextResponse.redirect(`${origin}/login`)
  }

  if (sessionError) {
    console.error('Auth callback error:', sessionError.message)
    return NextResponse.redirect(`${origin}/login?error=auth`)
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // Check if user already has a row in public.users
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle()

  if (!existing) {
    // New user — create their row and send to onboarding
    await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      plan: 'free',
      credits: 3,
    })
    return NextResponse.redirect(`${origin}/onboarding`)
  }

  // Existing user — send to dashboard
  return NextResponse.redirect(`${origin}/dashboard`)
}
