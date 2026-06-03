'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const router = useRouter()

  useEffect(() => {
    const client = createClient()
    setSupabase(client)
    client.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/dashboard')
    })
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B]">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">visteo</h1>
          <p className="text-white/40 text-sm">Sign in to your account</p>
        </div>

        <div className="border border-white/8 rounded-2xl p-8 bg-white/[0.02]">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">📬</div>
              <p className="font-semibold text-white">Check your email</p>
              <p className="text-white/40 text-sm mt-2">
                We sent a magic link to <span className="text-white/70">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-white
                           bg-white/5 border border-white/10
                           placeholder:text-white/20
                           focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-xl font-semibold text-sm
                           hover:bg-white/90 transition-colors">
                Send magic link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
